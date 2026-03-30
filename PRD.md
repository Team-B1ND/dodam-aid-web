# @b1nd/aid-kit 사용 가이드

## 목차

1. [개요](#1-개요)
2. [설치 및 의존성](#2-설치-및-의존성)... (3KB 남음)

AID_USAGES.md
53KB
﻿
# @b1nd/aid-kit 사용 가이드

## 목차

1. [개요](#1-개요)
2. [설치 및 의존성](#2-설치-및-의존성)
3. [패키지 구조](#3-패키지-구조)
4. [모듈별 상세 가이드](#4-모듈별-상세-가이드)
   - [4.1 Bridge Kit (Web ↔ Native 통신)](#41-bridge-kit)
   - [4.2 Navigation (탭/스택 라우팅)](#42-navigation)
   - [4.3 App State (영속 상태 관리)](#43-app-state)
   - [4.4 Safe Area Provider (안전 영역)](#44-safe-area-provider)
5. [전체 통합 예제](#5-전체-통합-예제)
6. [아키텍처 다이어그램](#6-아키텍처-다이어그램)
7. [타입 레퍼런스](#7-타입-레퍼런스)
8. [주의사항 및 트러블슈팅](#8-주의사항-및-트러블슈팅)

---

## 1. 개요

`@b1nd/aid-kit`은 **React (Web)** 와 **React Native (App)** 간의 WebView 기반 통신, 라우팅, 상태 관리, 안전 영역 처리를 제공하는 크로스 플랫폼 툴킷이다.

**핵심 역할:**
- **Bridge Kit**: WebView를 통해 웹 앱과 네이티브 앱 간 양방향 메시지 통신
- **Navigation**: 웹 앱 내에서 탭/스택 기반 네비게이션 (스와이프 뒤로가기 지원)
- **App State**: localStorage 기반 영속 상태 관리
- **Safe Area Provider**: 노치/베젤 디바이스의 안전 영역 값 주입

**사용 시나리오:** React Native 앱이 WebView로 웹 앱을 렌더링하고, 네이티브 기능(카메라, GPS, QR 스캔 등)을 웹에서 호출해야 할 때 사용한다.

---

## 2. 설치 및 의존성

```bash
pnpm add @b1nd/aid-kit
```

### 필수 Peer Dependencies

| 패키지 | 버전 | 사용처 |
|--------|------|--------|
| `react` | `*` | 전체 |
| `react-dom` | `*` | Web 측 |
| `react-native` | `>=0.75.0` | App 측 |
| `react-native-webview` | `>=13.16.1` | App 측 (WebView) |
| `react-native-reanimated` | `>=4.1.1` | App 측 (BottomSheet 애니메이션) |
| `react-native-worklets` | `0.5.1` | App 측 (BottomSheet 콜백) |
| `styled-components` | `>=6` | App 측 (BottomSheet 스타일) |
| `framer-motion` | `>=12.35.2` | Web 측 (StackScreen 애니메이션) |
| `zod` | `^4.3.6` | Shared (GPS 스키마 검증) |

### Import 경로

```typescript
// Web 앱에서 사용
import { ... } from "@b1nd/aid-kit/bridge-kit/web";
import { ... } from "@b1nd/aid-kit/navigation";
import { ... } from "@b1nd/aid-kit/app-state";
import { ... } from "@b1nd/aid-kit/safe-area-provider";

// Native 앱에서 사용
import { ... } from "@b1nd/aid-kit/bridge-kit/app";
```

---

## 3. 패키지 구조

```
packages/aid-kit/src/
├── bridge-kit/                    # WebView 브릿지 통신
│   ├── shared/                    # Web/App 공통 타입, 빌더
│   │   ├── builder/
│   │   │   ├── request.ts         # Request 메시지 생성 함수
│   │   │   └── response.ts        # Response 메시지 생성 함수
│   │   └── types/
│   │       ├── dto/
│   │       │   ├── bridge-reqeust.ts   # BridgeRequest 인터페이스
│   │       │   ├── bridge-response.ts  # BridgeResponse 인터페이스
│   │       │   └── gps.ts              # GPS 관련 Zod 스키마
│   │       ├── enums/
│   │       │   ├── actions.ts          # 액션 타입 상수
│   │       │   └── error.ts            # 에러 타입 상수
│   │       ├── payloads/
│   │       │   └── ack.ts              # ACK 페이로드 타입
│   │       └── global.d.ts             # Window.ReactNativeWebView 선언
│   ├── web/index.ts               # Web 측 Export 진입점
│   ├── app/index.ts               # App 측 Export 진입점
│   └── core/
│       ├── models/
│       │   ├── BridgeCore.ts       # 핵심 메시지 라우팅 엔진
│       │   ├── BridgeContext.ts    # Web 측 React Context
│       │   └── bridge-ui-context.ts # App 측 UI Context
│       ├── providers/
│       │   ├── BridgeProvider.tsx   # Web 측 Provider
│       │   └── BridgeUiProvider.tsx # App 측 UI Provider
│       ├── hooks/
│       │   ├── useBridgeProvider.ts # Web: 브릿지 컨텍스트 접근
│       │   ├── useBridgeResponse.ts # Web: 응답 구독
│       │   ├── useBridgeCore.ts     # App: WebView ref/onMessage 설정
│       │   └── useBridgeUi.ts       # App: UI 상태 접근
│       ├── ui/
│       │   └── BottomSheet/         # App: 바텀시트 UI 컴포넌트
│       ├── constants/
│       │   └── ttl.ts               # 메시지 만료 시간 (5분)
│       └── utils/
│           ├── filter-expired-tasks.ts  # 만료 태스크 필터링
│           └── is-expired.ts            # 만료 여부 체크
├── navigation/                    # 탭/스택 라우팅 시스템
│   ├── ui/
│   │   ├── RouteProvider.tsx       # 라우트 상태 관리 Provider
│   │   ├── Router.tsx              # 라우트 렌더링 컨트롤러
│   │   ├── RouteRenderer.tsx       # 매칭된 라우트 렌더러
│   │   └── StackScreen.tsx         # 스택 화면 (스와이프 뒤로가기)
│   ├── hooks/
│   │   └── useRouter.ts            # 라우터 훅
│   ├── types/index.ts              # 라우트 관련 타입
│   ├── utils/match-routes.ts       # 경로 매칭 유틸리티
│   └── constants/index.ts          # 스와이프 설정값
├── app-state/                     # 영속 상태 관리
│   ├── providers/
│   │   └── AppStateProvider.tsx    # 상태 Provider (localStorage 연동)
│   ├── hooks/
│   │   └── useAppState.ts          # 상태 훅 (useState와 동일 API)
│   ├── constants/key.ts            # localStorage 키 ("app_state")
│   ├── types/index.ts              # 상태 관련 타입
│   └── utils/load-from-storage.ts  # 스토리지 로딩 유틸
└── safe-area-provider/            # 안전 영역
    ├── providers/
    │   └── SafeAreaProvider.tsx     # 안전 영역 Provider (URL 파라미터 파싱)
    ├── hooks/
    │   └── useSafeArea.ts          # 안전 영역 값 접근 훅
    └── types/index.ts              # 안전 영역 타입
```

---

## 4. 모듈별 상세 가이드

### 4.1 Bridge Kit

Bridge Kit은 **Web ↔ Native** 간 WebView 메시지 통신을 담당한다. Web과 App에서 각각 다른 진입점을 사용한다.

#### 4.1.1 메시지 프로토콜

모든 통신은 JSON 직렬화된 `BridgeRequest` / `BridgeResponse` 객체로 이루어진다.

**BridgeRequest (Web → App):**
```typescript
interface BridgeRequest {
  id: string;        // crypto.randomUUID()으로 자동 생성
  type: Action;      // 액션 타입 (예: "QR_SCAN")
  timestamp: number; // Date.now() 자동 생성
  payload: unknown;  // 액션별 요청 데이터
}
```

**BridgeResponse (App → Web):**
```typescript
interface BridgeResponse {
  id: string;        // 원본 요청의 id
  type: Action;      // 액션 타입
  timestamp: number; // 응답 생성 시각
  success: boolean;  // 성공 여부
  data?: unknown;    // 성공 시 결과 데이터
  error?: Error;     // 실패 시 에러 타입
}
```

#### 4.1.2 지원 액션 (Actions)

```typescript
const Actions = {
  CAMERA_CAPTURE: "CAMERA_CAPTURE", // 카메라 캡처
  GPS_GET: "GPS_GET",               // GPS 위치 가져오기
  OAUTH_GET_TOKEN: "OAUTH_GET_TOKEN", // OAuth 토큰 획득
  FILE_SELECT: "FILE_SELECT",       // 파일 선택
  FILE_SAVE: "FILE_SAVE",           // 파일 저장
  NFC_WRITE: "NFC_WRITE",           // NFC 쓰기
  NFC_READ: "NFC_READ",             // NFC 읽기
  QR_SCAN: "QR_SCAN",               // QR 코드 스캔
  SYNC: "SYNC",                     // 태스크 동기화 (내부)
  ACK: "ACK",                       // 응답 확인 (내부)
} as const;

type Action = keyof typeof Actions;
```

> `SYNC`와 `ACK`는 내부 프로토콜용이다. 직접 사용하지 않는다.

#### 4.1.3 에러 타입 (Errors)

```typescript
const Errors = {
  TIMEOUT: "TIMEOUT",                   // 시간 초과
  PREMISSION_DENIED: "PERMISSION_DENIED", // 권한 거부
  NOT_SUPPORT: "NOT_SUPPORTED",          // 미지원 액션
  CANCELLED: "CANCELLED",               // 사용자 취소
  UNKNOWN: "UNKNOWN",                    // 알 수 없는 에러
} as const;
```

#### 4.1.4 통신 흐름

```
┌─────────────────────────────────────────────────────────────────────┐
│                        통신 흐름 (Request-Response)                  │
│                                                                     │
│  [Web App]                                      [Native App]        │
│                                                                     │
│  1. send(Actions.QR_SCAN, payload)                                  │
│     └─→ window.ReactNativeWebView.postMessage(JSON)                 │
│                                            │                        │
│                                   2. WebView.onMessage 수신          │
│                                      BridgeCore.receive() 호출      │
│                                            │                        │
│                                   3. handlers에서 핸들러 조회         │
│                                      핸들러 실행 (예: UI 열기)        │
│                                            │                        │
│                                   4. 결과를 Response로 래핑           │
│                                      WebView.postMessage(JSON)      │
│                                            │                        │
│  5. window "message" 이벤트 수신   ←───────┘                        │
│     subscribe된 handler 호출                                        │
│                                                                     │
│  6. ACK 전송으로 태스크 완료 알림                                     │
│     └─→ send(Actions.ACK, { id })                                   │
└─────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────┐
│                        통신 흐름 (Push - App→Web 단방향)              │
│                                                                     │
│  [Native App]                                   [Web App]           │
│                                                                     │
│  1. core.mountPush(Actions.GPS_GET, (send) => {                     │
│       // send()를 호출할 때마다 Web으로 데이터 전송                    │
│       const interval = setInterval(                                 │
│         () => send({ coords, timestamp }), 3000                     │
│       );                                                            │
│       return () => clearInterval(interval);                         │
│     });                                                             │
│                                            │                        │
│  2. useBridgeCore() 내부에서                                        │
│     core.startPush() 호출                                           │
│     → WebView.postMessage(JSON)            │                        │
│                                            │                        │
│  3. BridgeProvider가 "message"    ←────────┘                        │
│     이벤트 수신 후 enqueue                                           │
│                                                                     │
│  4. useBridgeResponse로 구독한                                      │
│     handler에 데이터 전달                                            │
└─────────────────────────────────────────────────────────────────────┘
```

#### 4.1.5 TTL과 SYNC 메커니즘

- 모든 메시지는 **5분(TTL = 300,000ms)** 의 유효기간을 가진다.
- 웹이 로드될 때 `SYNC` 요청을 보내 아직 처리되지 않은 태스크를 받아온다.
- 만료된 태스크는 자동으로 필터링되고, `ACK`로 삭제를 알린다.
- 이 메커니즘 덕분에 웹 페이지가 새로고침되어도 미완료 태스크를 복구할 수 있다.

#### 4.1.6 Web 측 사용법

**Export 목록 (`@b1nd/aid-kit/bridge-kit/web`):**

| Export | 종류 | 설명 |
|--------|------|------|
| `BridgeProvider` | 컴포넌트 | 브릿지 컨텍스트 Provider. 앱 루트에 배치 |
| `useBridgeProvider()` | 훅 | `{ send, subscribe }` 반환 |
| `useBridgeResponse(action, handler)` | 훅 | 특정 액션의 응답을 구독 |
| `Actions` | 상수 | 액션 타입 상수 객체 |
| `Errors` | 상수 | 에러 타입 상수 객체 |
| `Request(action, payload)` | 함수 | BridgeRequest 객체 생성 |
| `Response(id, type, success, data?, error?)` | 함수 | BridgeResponse 객체 생성 |
| `BridgeContext` | Context | React Context (직접 사용 드묾) |
| `BridgeRequest` | 타입 | 요청 DTO 인터페이스 |
| `BridgeResponse` | 타입 | 응답 DTO 인터페이스 |
| `BridgeContextValue` | 타입 | 컨텍스트 값 인터페이스 |
| `Action` | 타입 | 액션 키 유니온 타입 |
| `Error` | 타입 | 에러 키 유니온 타입 |
| `GPSCoordinatesSchema` | Zod 스키마 | GPS 좌표 검증 스키마 |
| `GPSGetRequestSchema` | Zod 스키마 | GPS 요청 검증 스키마 |
| `GPSCoordinates` | 타입 | GPS 좌표 타입 |
| `GPSGetRequest` | 타입 | GPS 요청 타입 |
| `GPSGetResponse` | 타입 | GPS 응답 타입 |

**Step 1: Provider 설정**

```tsx
// main.tsx
import { BridgeProvider } from "@b1nd/aid-kit/bridge-kit/web";

createRoot(document.getElementById("root")!).render(
  <BridgeProvider>
    <App />
  </BridgeProvider>
);
```

> `BridgeProvider`는 마운트 시 자동으로 `SYNC` 요청을 보내 미완료 태스크를 복구한다.

**Step 2: 네이티브 기능 요청 (send)**

```tsx
import { useBridgeProvider, Actions } from "@b1nd/aid-kit/bridge-kit/web";

const MyComponent = () => {
  const { send } = useBridgeProvider();

  // 페이로드 없이 요청
  const handleScanQR = () => {
    send(Actions.QR_SCAN);
  };

  // 페이로드와 함께 요청
  const handleGetGPS = () => {
    send(Actions.GPS_GET, { accuracy: "high" });
  };

  return (
    <>
      <button onClick={handleScanQR}>QR 스캔</button>
      <button onClick={handleGetGPS}>위치 가져오기</button>
    </>
  );
};
```

**`send(type: Action, payload?: unknown): void`**
- `type`: 호출할 액션 (예: `Actions.QR_SCAN`)
- `payload`: 액션별 요청 데이터 (선택)
- 내부적으로 `window.ReactNativeWebView.postMessage()`를 호출한다.
- WebView 환경이 아닌 경우(브라우저 단독 실행) `ReactNativeWebView`가 `undefined`이므로 에러 없이 무시된다.

**Step 3: 네이티브 응답 수신 (useBridgeResponse)**

```tsx
import {
  useBridgeResponse,
  Actions,
  type BridgeResponse,
} from "@b1nd/aid-kit/bridge-kit/web";
import { useState } from "react";

const QRScanner = () => {
  const [result, setResult] = useState("");

  useBridgeResponse(Actions.QR_SCAN, async (data) => {
    const res = data as BridgeResponse;
    if (res.success && typeof res.data === "string") {
      setResult(res.data);
    } else {
      setResult(`에러: ${res.error}`);
    }
    return res;
  });

  return <p>스캔 결과: {result}</p>;
};
```

**`useBridgeResponse(type: Action, handler: Callback): void`**
- `type`: 구독할 액션 타입
- `handler`: `(data: unknown) => Promise<object | Error>` 형태의 콜백
  - `data`를 `BridgeResponse`로 캐스팅하여 사용
  - `res.success`로 성공/실패 분기
  - 성공 시 `res.data`에 결과 데이터
  - 실패 시 `res.error`에 에러 타입 문자열
- 컴포넌트 마운트 시 구독하고, 언마운트 시 자동 해제된다.
- 한 액션에 하나의 핸들러만 등록 가능하다 (마지막 등록이 유효).

**Step 4: subscribe로 직접 구독 (고급)**

```tsx
import { useBridgeProvider, Actions } from "@b1nd/aid-kit/bridge-kit/web";
import { useEffect } from "react";

const MyComponent = () => {
  const { subscribe } = useBridgeProvider();

  useEffect(() => {
    const unsubscribe = subscribe(Actions.GPS_GET, async (data) => {
      console.log("GPS 데이터:", data);
      return data as object;
    });
    return unsubscribe; // 컴포넌트 언마운트 시 구독 해제
  }, []);
};
```

> `useBridgeResponse`는 내부적으로 `subscribe`를 호출하는 편의 훅이다. 대부분의 경우 `useBridgeResponse`를 사용하면 된다.

#### 4.1.7 App (Native) 측 사용법

**Export 목록 (`@b1nd/aid-kit/bridge-kit/app`):**

| Export | 종류 | 설명 |
|--------|------|------|
| `BridgeUiProvider` | 컴포넌트 | 바텀시트 UI 관리 Provider |
| `useBridgeCore()` | 훅 | WebView props (`ref`, `onMessage`) 반환 |
| `useBridgeUi()` | 훅 | UI 열기/닫기/결과 설정 |
| `core` | 인스턴스 | BridgeCore 싱글턴 (핸들러 등록용) |
| `BridgeCore` | 클래스 | BridgeCore 클래스 (직접 사용 드묾) |
| `Actions` | 상수 | 액션 타입 상수 객체 |
| `Errors` | 상수 | 에러 타입 상수 객체 |
| `BridgeUiContext` | Context | React Context (직접 사용 드묾) |
| `BridgeUi` | 타입 | `Action \| "NONE"` |
| `WebViewBridge` | 타입 | `{ postMessage(message: string): void }` |

**Step 1: BridgeUiProvider 설정**

```tsx
// _layout.tsx
import { BridgeUiProvider } from "@b1nd/aid-kit/bridge-kit/app";
import QrScan from "./components/QrScan";

function RootLayout() {
  const { top } = useSafeAreaInsets(); // react-native-safe-area-context

  return (
    <BridgeUiProvider
      top={top}
      screens={{
        QR_SCAN: <QrScan />,
        // 다른 UI 스크린도 여기에 등록
      }}
    >
      {/* 앱 네비게이션 */}
    </BridgeUiProvider>
  );
}
```

**`BridgeUiProvider` Props:**
| Prop | 타입 | 설명 |
|------|------|------|
| `top` | `number` | 바텀시트 상단 오프셋 (보통 Safe Area top inset) |
| `screens` | `Partial<Record<Action, ReactNode>>` | 액션별 바텀시트에 렌더링할 React 컴포넌트 |
| `children` | `ReactNode` | 자식 컴포넌트 |

**Step 2: WebView에 브릿지 연결**

```tsx
import { WebView } from "react-native-webview";
import {
  Actions,
  core,
  useBridgeCore,
  useBridgeUi,
} from "@b1nd/aid-kit/bridge-kit/app";

const WebViewScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { webViewProps } = useBridgeCore();
  const { open } = useBridgeUi();

  // Request-Response 핸들러 등록
  core.mount(Actions.QR_SCAN, async () => {
    const result = await open("QR_SCAN"); // 바텀시트 열기, 결과 대기
    return result; // Web으로 응답 전송
  });

  // Push 핸들러 등록 (App → Web 단방향 스트리밍)
  core.mountPush(Actions.GPS_GET, (send) => {
    const interval = setInterval(() => {
      send({ latitude: 37.5, longitude: 127.0, timestamp: Date.now() });
    }, 3000);
    return () => clearInterval(interval); // cleanup 함수 반환 필수
  });

  const uri = `https://your-web-app.com?top=${top}&bottom=${bottom}`;

  return <WebView {...webViewProps} source={{ uri }} />;
};
```

**`useBridgeCore()` 반환값:**
```typescript
{
  webViewProps: {
    ref: (node: WebView | null) => void;  // WebView ref 콜백
    onMessage: (event: WebViewMessageEvent) => void;  // 메시지 핸들러
  }
}
```

> `webViewProps`를 WebView에 스프레드(`{...webViewProps}`)하면 자동으로 연결된다.

**`core.mount(action, callback)` - Request-Response 핸들러:**
- `action`: 처리할 액션 타입
- `callback`: `() => Promise<object | Error | null>` 형태의 비동기 콜백
  - 반환값이 `Errors`에 정의된 에러 문자열이면 실패 응답으로 전송
  - 그 외에는 성공 응답의 `data`로 전송

**`core.mountPush(action, handler)` - Push 핸들러:**
- `action`: 푸시할 액션 타입
- `handler`: `(send: (data: unknown) => void) => () => void`
  - `send` 함수를 받아 원할 때마다 호출하여 Web으로 데이터 전송
  - cleanup 함수를 반환해야 함 (인터벌/리스너 정리용)

**`core.unmount(action)` - 핸들러 해제:**
- 등록된 핸들러를 제거한다.

**Step 3: 바텀시트 UI 컴포넌트 구현**

```tsx
// QrScan.tsx
import { useBridgeUi } from "@b1nd/aid-kit/bridge-kit/app";
import { Button, View } from "react-native";

const QrScan = () => {
  const { setResult, close } = useBridgeUi();

  const handleScanComplete = (qrData: string) => {
    setResult(qrData); // 결과를 설정하고 바텀시트 자동 닫힘
  };

  const handleCancel = () => {
    setResult("CANCELLED"); // 에러 문자열 반환 → 실패 응답
  };

  const handlePermissionDenied = () => {
    setResult("PREMISSION_DENIED"); // 권한 거부 에러
  };

  return (
    <View>
      {/* QR 스캐너 UI */}
      <Button onPress={() => handleScanComplete("https://example.com")} title="스캔 완료" />
      <Button onPress={handleCancel} title="취소" />
    </View>
  );
};
```

**`useBridgeUi()` 반환값:**
```typescript
{
  ui: BridgeUi;                                    // 현재 열린 UI ("NONE" | Action)
  open: (bridgeUi: Action) => Promise<object | Error | null>;  // UI 열기 (결과 Promise 반환)
  close: () => void;                               // UI 닫기 (null 결과)
  result: object | Error | null;                   // 현재 결과
  setResult: (result: object | Error | null) => void;  // 결과 설정 후 UI 닫기
}
```

> `open()`은 Promise를 반환한다. `setResult()` 또는 `close()`가 호출될 때까지 대기한다.
> 바텀시트를 스와이프로 닫으면 자동으로 `CANCELLED` 에러가 결과로 설정된다.

#### 4.1.8 BottomSheet 컴포넌트 (App 내부 UI)

`BridgeUiProvider`가 내부적으로 사용하는 바텀시트 컴포넌트이다. 직접 import할 필요는 없지만 동작을 이해하면 UI 스크린 구현에 도움이 된다.

**동작 방식:**
1. `open(action)`이 호출되면 해당 `action`에 매핑된 스크린이 바텀시트로 올라온다.
2. 바텀시트는 화면 하단에서 스프링 애니메이션으로 등장한다 (stiffness: 220, mass: 0.9).
3. 배경에 반투명 검은색 Backdrop(`rgba(0, 0, 0, 0.5)`)이 표시된다.
4. 컨텐츠 영역은 `border-radius: 16px`의 흰색 카드 형태이다.
5. `top` prop만큼 상단 여백이 적용되어 상태바/노치를 침범하지 않는다.

**스와이프로 닫기:**
- 아래로 8px 이상 드래그하면 스와이프 인식 시작
- 화면 높이의 25% 이상 드래그하거나 속도 0.5 이상이면 닫힘
- 스와이프로 닫으면 `Errors.CANCELLED`가 결과로 설정됨 → Web에 실패 응답 전송
- 닫히는 애니메이션(180ms tween) 완료 후 `onAfterClose`로 상태 정리

**스크린 컴포넌트에서 사용 가능한 API:**
```tsx
const MyScreen = () => {
  const { setResult, close, ui, result } = useBridgeUi();

  // 성공 결과 반환 (바텀시트 자동 닫힘)
  setResult({ scannedData: "abc123" });

  // 에러 결과 반환 (바텀시트 자동 닫힘)
  setResult("CANCELLED");          // → 취소
  setResult("PREMISSION_DENIED");  // → 권한 거부
  setResult("TIMEOUT");            // → 시간 초과

  // 결과 없이 닫기 (null 반환)
  close();

  // 현재 열린 UI 확인
  console.log(ui); // "QR_SCAN" | "NONE" | ...
};
```

**open-setResult 흐름 상세:**
```
core.mount(QR_SCAN, async () => {
  // 1. open() 호출 → 바텀시트 열림, Promise 대기
  const result = await open("QR_SCAN");
  //                        ↑ 여기서 블로킹

  // 4. setResult()가 호출되면 Promise resolve → 결과 반환
  return result;
  // → Errors에 정의된 문자열이면 실패 응답
  // → 그 외 객체/문자열이면 성공 응답
});

// 바텀시트 내부 컴포넌트:
// 2. 사용자가 QR 스캔 등 작업 수행
// 3. setResult("scanned-data") 호출 → 바텀시트 닫힘 + Promise resolve
```

#### 4.1.9 새로운 네이티브 기능 추가하기 (커스텀 액션 구현 체크리스트)

새로운 네이티브 기능(예: NFC 읽기)을 추가하려면 다음 단계를 따른다:

**1단계: screens에 UI 컴포넌트 등록 (바텀시트가 필요한 경우)**
```tsx
// _layout.tsx
<BridgeUiProvider
  top={top}
  screens={{
    QR_SCAN: <QrScan />,
    NFC_READ: <NfcReader />,  // 새 스크린 추가
  }}
>
```

**2단계: core.mount로 핸들러 등록 (App)**
```tsx
// UI가 필요한 경우 (바텀시트)
core.mount(Actions.NFC_READ, async () => {
  const result = await open("NFC_READ");
  return result;
});

// UI 없이 바로 처리하는 경우
core.mount(Actions.GPS_GET, async () => {
  try {
    const location = await getCurrentPosition();
    return { coords: location }; // 성공 객체 반환
  } catch {
    return "PREMISSION_DENIED";  // 에러 문자열 반환
  }
});
```

**3단계: Web에서 요청 전송**
```tsx
const { send } = useBridgeProvider();
send(Actions.NFC_READ);
```

**4단계: Web에서 응답 수신**
```tsx
useBridgeResponse(Actions.NFC_READ, async (data) => {
  const res = data as BridgeResponse;
  if (res.success) {
    console.log("NFC 데이터:", res.data);
  }
  return res;
});
```

---

### 4.2 Navigation

Web 앱 내에서 **탭 기반 메인 네비게이션**과 **스택 기반 오버레이 네비게이션**을 제공한다.

**Export 목록 (`@b1nd/aid-kit/navigation`):**

| Export | 종류 | 설명 |
|--------|------|------|
| `RouteProvider` | 컴포넌트 | 라우트 상태 관리 Provider |
| `Router` | 컴포넌트 | 라우트 렌더링 컨트롤러 |
| `RouteRenderer` | 컴포넌트 | 매칭된 라우트 렌더러 (내부용) |
| `StackScreen` | 컴포넌트 | 스택 화면 래퍼 (스와이프 지원) |
| `useRouter()` | 훅 | 네비게이션 함수 접근 |
| `matchRoute(routes, path)` | 함수 | 경로 매칭 유틸리티 |
| `isValidPath(routes, path)` | 함수 | 경로 유효성 검사 |
| `Routes` | 타입 | 라우트 정의 최상위 타입 |
| `RouteNode` | 타입 | 개별 라우트 노드 |
| `RouteProps` | 타입 | 라우트 컴포넌트가 받는 props |
| `RouteParams` | 타입 | URL 파라미터 객체 |
| `RouteState` | 타입 | 라우트 상태 객체 |
| `StackEntry` | 타입 | 스택 항목 |

#### 4.2.1 라우트 정의

```typescript
import { type Routes } from "@b1nd/aid-kit/navigation";

const routes: Routes = {
  // 탭 네비게이션: 하단 탭으로 전환하는 메인 화면들
  tabs: [
    {
      path: "/",                    // 레이아웃 경로
      element: TabLayout,           // 레이아웃 컴포넌트 (outlet 사용)
      children: [
        { path: "/", index: true, element: HomePage },       // 기본 탭 (index: true)
        { path: "/settings", element: SettingsPage },         // 설정 탭
        { path: "/profile/:userId", element: ProfilePage },   // 동적 파라미터
      ],
    },
  ],
  // 스택 네비게이션: 오버레이로 뜨는 화면들 (스와이프 뒤로가기 지원)
  stacks: [
    { path: "/detail", element: DetailPage },
    { path: "/detail/:id", element: DetailPage },    // 동적 파라미터 지원
  ],
};
```

**`RouteNode` 인터페이스:**
```typescript
interface RouteNode {
  path: string;                                    // URL 경로 (":param" 동적 파라미터 지원)
  index?: boolean;                                 // true면 부모 경로의 기본 자식
  element: (props: RouteProps) => JSX.Element;     // 렌더링할 컴포넌트
  children?: RouteNode[];                          // 중첩 라우트 (탭에서 사용)
}
```

**`RouteProps` 인터페이스:**
```typescript
interface RouteProps<S extends RouteState = RouteState> {
  outlet?: ReactNode;        // 자식 라우트 렌더 결과 (레이아웃에서 사용)
  params?: RouteParams;      // URL 파라미터 (예: { userId: "123" })
  state?: S;                 // push/move 시 전달된 상태
}
```

#### 4.2.2 Provider 및 Router 설정

```tsx
import { RouteProvider, Router } from "@b1nd/aid-kit/navigation";

const App = () => {
  return (
    <RouteProvider routes={routes}>
      <Router routes={routes} />
    </RouteProvider>
  );
};
```

> `RouteProvider`는 반드시 `AppStateProvider` 하위에 위치해야 한다. 내부적으로 `useAppState`를 사용하여 탭/스택 상태를 localStorage에 영속화한다.

#### 4.2.3 useRouter 훅

```typescript
const { tab, stack } = useRouter();
```

**반환값 구조:**
```typescript
{
  tab: {
    current: string;                                   // 현재 탭 경로 (예: "/")
    move: (target: string, state?: RouteState) => void; // 탭 전환
  };
  stack: {
    current: StackEntry[];                             // 현재 스택 배열
    push: (target: string, state?: RouteState) => void; // 스택 화면 추가
    pop: (target?: string) => void;                    // 스택 화면 제거
  };
}
```

**`tab.move(target, state?)`**
- 탭을 전환한다. `target`은 `routes.tabs`에 정의된 경로여야 한다.
- 유효하지 않은 경로를 전달하면 에러를 throw한다.

**`stack.push(target, state?)`**
- 새 스택 화면을 추가한다. `target`은 `routes.stacks`에 정의된 경로여야 한다.
- 화면은 오른쪽에서 슬라이드인 애니메이션으로 나타난다.
- `state`를 통해 데이터를 전달할 수 있다.

**`stack.pop(target?)`**
- `target` 없이 호출: 가장 위의 스택 화면 제거
- `target` 지정: 해당 경로와 일치하는 가장 마지막 스택 화면 제거

#### 4.2.4 레이아웃 컴포넌트 (outlet 패턴)

```tsx
import { type RouteProps, useRouter } from "@b1nd/aid-kit/navigation";

// 부모 라우트의 element는 outlet으로 자식을 렌더링한다
const TabLayout = ({ outlet }: RouteProps) => {
  const { tab: { current, move } } = useRouter();

  return (
    <div>
      <main>{outlet}</main> {/* 여기에 현재 탭의 자식 컴포넌트가 렌더링됨 */}
      <nav>
        <button onClick={() => move("/")}>홈</button>
        <button onClick={() => move("/settings")}>설정</button>
      </nav>
    </div>
  );
};
```

#### 4.2.5 동적 파라미터와 상태 전달

```tsx
// 라우트 정의
const routes: Routes = {
  tabs: [/* ... */],
  stacks: [
    { path: "/user/:userId", element: UserDetail },
  ],
};

// push 시 상태 전달
const { stack: { push } } = useRouter();
push("/user/42", { userName: "홍길동" });

// 받는 쪽
const UserDetail = ({ params, state }: RouteProps) => {
  // params = { userId: "42" }
  // state = { userName: "홍길동" }
  return <h1>{state?.userName} (ID: {params?.userId})</h1>;
};
```

#### 4.2.6 스택 화면 스와이프 뒤로가기

스택 화면(`StackScreen`)은 자동으로 스와이프 뒤로가기를 지원한다:

- **Edge swipe**: 화면 왼쪽 40px 영역에서 오른쪽으로 드래그
- **Flick**: 빠르게 오른쪽으로 스와이프 (속도 ≥ 0.5px/ms)
- **50% 이상 드래그**: 화면 너비의 50% 이상 드래그하면 닫힘
- 닫히는 동안 배경이 어두워지는 dim 효과 적용
- 스프링 애니메이션으로 자연스러운 전환 (stiffness: 220, damping: 26)

---

### 4.3 App State

`localStorage` 기반의 영속 상태 관리 모듈이다. `useState`와 동일한 API를 제공하면서 페이지 새로고침 후에도 상태를 유지한다.

**Export 목록 (`@b1nd/aid-kit/app-state`):**

| Export | 종류 | 설명 |
|--------|------|------|
| `AppStateProvider` | 컴포넌트 | 상태 관리 Provider |
| `useAppState(initialValue, key)` | 훅 | 영속 상태 관리 훅 |
| `STORAGE_KEY` | 상수 | localStorage 키 (`"app_state"`) |
| `loadFromStorage()` | 함수 | 스토리지에서 상태 로딩 |
| `AppStateContext` | Context | React Context (직접 사용 드묾) |
| `StateStore` | 타입 | `Record<string, unknown>` |
| `Widen<T>` | 타입 | 리터럴 타입을 기본 타입으로 확장 |

#### 4.3.1 Provider 설정

```tsx
import { AppStateProvider } from "@b1nd/aid-kit/app-state";

createRoot(document.getElementById("root")!).render(
  <AppStateProvider>
    <App />
  </AppStateProvider>
);
```

> `AppStateProvider`는 반드시 `RouteProvider`보다 상위에 위치해야 한다. Navigation 모듈이 내부적으로 `useAppState`를 사용하기 때문이다.

#### 4.3.2 useAppState 훅

```typescript
const [value, setValue] = useAppState<T>(initialValue, key);
```

**파라미터:**
| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `initialValue` | `T` | 초기값 (스토리지에 값이 없을 때 사용) |
| `key` | `string` | 상태를 식별하는 고유 키 |

**반환값:** `[Widen<T>, Dispatch<SetStateAction<Widen<T>>>]`
- React의 `useState`와 동일한 `[상태, setter]` 튜플
- `Widen<T>`: 리터럴 타입을 기본 타입으로 확장 (예: `"hello"` → `string`)

**사용 예시:**

```tsx
import { useAppState } from "@b1nd/aid-kit/app-state";

const Counter = () => {
  const [count, setCount] = useAppState(0, "counter");

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
    </div>
  );
};
```

#### 4.3.3 저장 메커니즘

- 모든 상태는 단일 객체로 관리되며 `localStorage`의 `"app_state"` 키에 JSON으로 저장된다.
- **디바운싱**: 상태 변경 후 100ms 후에 localStorage에 기록한다. 연속적인 업데이트는 마지막 하나만 기록된다.
- **최초 로드**: `AppStateProvider` 마운트 시 `localStorage`에서 기존 데이터를 로드한다. 없으면 빈 객체 `{}`로 시작한다.
- **키 충돌 방지**: 고유한 `key` 문자열을 사용해야 한다. Navigation 모듈은 `"router-provider::stack"`, `"router-provider::tab-entry"` 키를 사용하므로 이 키들은 피해야 한다.

---

### 4.4 Safe Area Provider

노치/베젤 디바이스의 안전 영역 값을 **URL 쿼리 파라미터**로 전달받아 Web 앱에 제공한다.

**Export 목록 (`@b1nd/aid-kit/safe-area-provider`):**

| Export | 종류 | 설명 |
|--------|------|------|
| `SafeAreaProvider` | 컴포넌트 | 안전 영역 Provider |
| `useSafeArea()` | 훅 | `{ top, bottom }` 반환 |
| `SafeAreaContext` | Context | React Context (직접 사용 드묾) |

#### 4.4.1 동작 원리

1. Native 앱이 WebView의 URL에 쿼리 파라미터로 Safe Area inset을 전달한다:
   ```
   https://your-web-app.com?top=47&bottom=34
   ```
2. `SafeAreaProvider`가 `window.location.search`에서 `top`과 `bottom` 값을 파싱한다.
3. 자식 컴포넌트에서 `useSafeArea()`로 접근한다.

#### 4.4.2 Native 측 URL 구성

```tsx
// React Native 앱
const { top, bottom } = useSafeAreaInsets();
const uri = `https://your-web-app.com?top=${top}&bottom=${bottom}`;

<WebView source={{ uri }} />
```

#### 4.4.3 Web 측 Provider 설정

```tsx
import { SafeAreaProvider } from "@b1nd/aid-kit/safe-area-provider";

createRoot(document.getElementById("root")!).render(
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);
```

#### 4.4.4 useSafeArea 훅

```tsx
import { useSafeArea } from "@b1nd/aid-kit/safe-area-provider";

const Header = () => {
  const { top, bottom } = useSafeArea();

  return (
    <header style={{ paddingTop: top }}>
      {/* 노치 아래부터 콘텐츠 시작 */}
    </header>
  );
};
```

**반환값:**
```typescript
{ top: number; bottom: number }
```
- URL에 파라미터가 없으면 기본값 `0`이 사용된다.

---

## 5. 전체 통합 예제

### 5.1 Web 앱 (dodam-test-web)

**Provider 계층 구조:**

```tsx
// main.tsx - Provider 순서가 중요!
import { AppStateProvider } from "@b1nd/aid-kit/app-state";
import { SafeAreaProvider } from "@b1nd/aid-kit/safe-area-provider";
import { BridgeProvider } from "@b1nd/aid-kit/bridge-kit/web";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppStateProvider>          {/* 1. 최상위: 영속 상태 */}
      <SafeAreaProvider>        {/* 2. 안전 영역 */}
        <BridgeProvider>        {/* 3. 브릿지 통신 */}
          <App />
        </BridgeProvider>
      </SafeAreaProvider>
    </AppStateProvider>
  </StrictMode>
);
```

> **Provider 순서 규칙:**
> 1. `AppStateProvider`가 최상위 (Navigation이 내부적으로 의존)
> 2. `SafeAreaProvider`는 `AppStateProvider` 하위
> 3. `BridgeProvider`는 `SafeAreaProvider` 하위
> 4. `RouteProvider`는 `AppStateProvider` 하위 (보통 App 컴포넌트 내부)

**라우트 및 앱 구성:**

```tsx
// App.tsx
import { RouteProvider, Router, type Routes } from "@b1nd/aid-kit/navigation";
import { TabLayout } from "./pages/TabLayout";
import { HomePage } from "./pages/HomePage";
import { SettingsPage } from "./pages/SettingsPage";
import { DetailPage } from "./pages/DetailPage";

const routes: Routes = {
  tabs: [
    {
      path: "/",
      element: TabLayout,
      children: [
        { path: "/", index: true, element: HomePage },
        { path: "/settings", element: SettingsPage },
      ],
    },
  ],
  stacks: [{ path: "/detail", element: DetailPage }],
};

const App = () => (
  <RouteProvider routes={routes}>
    <Router routes={routes} />
  </RouteProvider>
);
```

**탭 레이아웃:**

```tsx
// TabLayout.tsx
import { useRouter, type RouteProps } from "@b1nd/aid-kit/navigation";
import { useSafeArea } from "@b1nd/aid-kit/safe-area-provider";

export const TabLayout = ({ outlet }: RouteProps) => {
  const { tab: { current, move } } = useRouter();
  const { bottom } = useSafeArea();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <div style={{ flex: 1, overflow: "auto" }}>{outlet}</div>
      <nav style={{ paddingBottom: bottom }}>
        <button onClick={() => move("/")}>홈</button>
        <button onClick={() => move("/settings")}>설정</button>
      </nav>
    </div>
  );
};
```

**홈 페이지 (브릿지 + 네비게이션 + 안전 영역 조합):**

```tsx
// HomePage.tsx
import {
  useBridgeProvider,
  useBridgeResponse,
  Actions,
  type BridgeResponse,
} from "@b1nd/aid-kit/bridge-kit/web";
import { useSafeArea } from "@b1nd/aid-kit/safe-area-provider";
import { useRouter } from "@b1nd/aid-kit/navigation";
import { useState } from "react";

export const HomePage = () => {
  const { top, bottom } = useSafeArea();
  const { send } = useBridgeProvider();
  const { stack: { push } } = useRouter();
  const [qrResult, setQrResult] = useState("");

  // QR 스캔 응답 구독
  useBridgeResponse(Actions.QR_SCAN, async (data) => {
    const res = data as BridgeResponse;
    if (res.success) {
      setQrResult(res.data as string);
    } else {
      setQrResult(`에러: ${res.error}`);
    }
    return res;
  });

  return (
    <div style={{ paddingTop: top, paddingBottom: bottom }}>
      <button onClick={() => send(Actions.QR_SCAN)}>QR 스캔</button>
      {qrResult && <p>결과: {qrResult}</p>}
      <button onClick={() => push("/detail")}>상세 페이지</button>
    </div>
  );
};
```

**스택 페이지 (뒤로가기):**

```tsx
// DetailPage.tsx
import { useRouter } from "@b1nd/aid-kit/navigation";
import { useSafeArea } from "@b1nd/aid-kit/safe-area-provider";

export const DetailPage = () => {
  const { top } = useSafeArea();
  const { stack: { pop } } = useRouter();

  return (
    <div style={{ paddingTop: top, background: "#fff", height: "100vh" }}>
      <h2>상세 화면</h2>
      <p>← 왼쪽 가장자리에서 스와이프하여 뒤로가기</p>
      <button onClick={() => pop()}>← 뒤로</button>
    </div>
  );
};
```

### 5.2 Native 앱 (dodam-test-app)

**레이아웃 설정:**

```tsx
// _layout.tsx
import { BridgeUiProvider } from "@b1nd/aid-kit/bridge-kit/app";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QrScan from "./components/QrScan";

function RootLayoutNav() {
  const { top } = useSafeAreaInsets();

  return (
    <BridgeUiProvider top={top} screens={{ QR_SCAN: <QrScan /> }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </BridgeUiProvider>
  );
}
```

**WebView 화면 (핸들러 등록):**

```tsx
// index.tsx
import { WebView } from "react-native-webview";
import {
  Actions,
  core,
  useBridgeCore,
  useBridgeUi,
} from "@b1nd/aid-kit/bridge-kit/app";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const App = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { webViewProps } = useBridgeCore();
  const { open } = useBridgeUi();

  // QR 스캔 요청 시 바텀시트 열기
  core.mount(Actions.QR_SCAN, async () => {
    const result = await open("QR_SCAN");
    return result;
  });

  // GPS 데이터 주기적 전송
  core.mountPush(Actions.GPS_GET, (send) => {
    const interval = setInterval(() => {
      send({ position: "dgsw", timestamp: Date.now() });
    }, 3000);
    return () => clearInterval(interval);
  });

  const uri = `https://your-web-app.com?top=${top}&bottom=${bottom}`;

  return <WebView {...webViewProps} source={{ uri }} scrollEnabled={false} />;
};
```

**QR 스캔 바텀시트 컴포넌트:**

```tsx
// QrScan.tsx
import { useBridgeUi } from "@b1nd/aid-kit/bridge-kit/app";
import { Button, View } from "react-native";

const QrScan = () => {
  const { setResult } = useBridgeUi();

  return (
    <View>
      <Button onPress={() => setResult("scanned-qr-data")} title="스캔 완료" />
      <Button onPress={() => setResult("CANCELLED")} title="취소" />
    </View>
  );
};
```

---

## 6. 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          React Native App                               │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ BridgeUiProvider                                                 │   │
│  │  ├─ screens: { QR_SCAN: <QrScan/>, ... }                        │   │
│  │  ├─ BottomSheet (animated, swipe-to-close)                       │   │
│  │  │                                                               │   │
│  │  │  ┌──────────────────────────────────────────────────────┐     │   │
│  │  │  │ WebView                                              │     │   │
│  │  │  │  {...webViewProps}   ← useBridgeCore()               │     │   │
│  │  │  │                                                      │     │   │
│  │  │  │  core.mount(QR_SCAN, handler)                        │     │   │
│  │  │  │  core.mountPush(GPS_GET, pushHandler)                │     │   │
│  │  │  │                                                      │     │   │
│  │  │  │  ┌──────────────────────────────────────────────┐    │     │   │
│  │  │  │  │            Web App (WebView 내부)             │    │     │   │
│  │  │  │  │                                              │    │     │   │
│  │  │  │  │  AppStateProvider                            │    │     │   │
│  │  │  │  │   └─ SafeAreaProvider  (?top=47&bottom=34)   │    │     │   │
│  │  │  │  │       └─ BridgeProvider                      │    │     │   │
│  │  │  │  │           └─ RouteProvider                   │    │     │   │
│  │  │  │  │               └─ Router                      │    │     │   │
│  │  │  │  │                   ├─ [Tab] TabLayout         │    │     │   │
│  │  │  │  │                   │   ├─ HomePage            │    │     │   │
│  │  │  │  │                   │   └─ SettingsPage        │    │     │   │
│  │  │  │  │                   └─ [Stack] DetailPage      │    │     │   │
│  │  │  │  │                      (slide-in, swipe-back)  │    │     │   │
│  │  │  │  └──────────────────────────────────────────────┘    │     │   │
│  │  │  └──────────────────────────────────────────────────────┘     │   │
│  │  │                                                               │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘

메시지 흐름:
  Web → App: window.ReactNativeWebView.postMessage(JSON)
  App → Web: webViewRef.postMessage(JSON) → window "message" event
```

---

## 7. 타입 레퍼런스

### Bridge Kit - Shared Types

```typescript
// 액션 타입
type Action = "CAMERA_CAPTURE" | "GPS_GET" | "OAUTH_GET_TOKEN"
  | "FILE_SELECT" | "FILE_SAVE" | "NFC_WRITE" | "NFC_READ"
  | "QR_SCAN" | "SYNC" | "ACK";

// 에러 타입
type Error = "TIMEOUT" | "PREMISSION_DENIED" | "NOT_SUPPORT"
  | "CANCELLED" | "UNKNOWN";

// 요청 DTO
interface BridgeRequest {
  id: string;
  type: Action;
  timestamp: number;
  payload: unknown;
}

// 응답 DTO
interface BridgeResponse {
  id: string;
  type: Action;
  timestamp: number;
  success: boolean;
  data?: unknown;
  error?: Error;
}

// GPS 관련
interface GPSCoordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

type GPSGetRequest = {
  accuracy?: "low" | "balanced" | "high";
};

type GPSGetResponse = {
  coords: GPSCoordinates;
  timestamp: number;
};
```

### Bridge Kit - Web Types

```typescript
// BridgeProvider 컨텍스트 값
interface BridgeContextValue {
  send: (type: Action, payload?: unknown) => void;
  subscribe: (type: Action, handler: Callback) => () => void;
}

// 응답 핸들러 콜백
type Callback = (data: unknown) => Promise<object | Error>;
```

### Bridge Kit - App Types

```typescript
// 바텀시트에 등록할 스크린 맵
type Screens = Partial<Record<Action, ReactNode>>;

// UI 상태
type BridgeUi = Action | "NONE";

// UI 컨텍스트 값
interface BridgeUiContext {
  ui: BridgeUi;
  open: (bridgeUi: Action) => Promise<object | Error | null>;
  close: () => void;
  result: object | Error | null;
  setResult: (result: object | Error | null) => void;
}

// BridgeCore 핸들러 콜백
type Callback = () => Promise<object | Error | null>;

// Push 핸들러 콜백
type PushCallback = (send: (data: unknown) => void) => () => void;

// WebView 인터페이스
interface WebViewBridge {
  postMessage(message: string): void;
}
```

### Navigation Types

```typescript
interface Routes {
  stacks: RouteNode[];
  tabs: RouteNode[];
}

interface RouteNode {
  path: string;
  index?: boolean;
  element: (props: RouteProps) => JSX.Element;
  children?: RouteNode[];
}

interface RouteProps<S extends RouteState = RouteState> {
  outlet?: ReactNode;
  params?: RouteParams;
  state?: S;
}

type RouteParams = Record<string, string>;
type RouteState = Record<string, any>;

interface StackEntry {
  path: string;
  state?: RouteState;
}

interface ContextType {
  stack: StackEntry[];
  tab: string;
  move: (target: string, state?: RouteState) => void;
  push: (target: string, state?: RouteState) => void;
  pop: (target?: string) => void;
}
```

### App State Types

```typescript
type StateStore = Record<string, unknown>;

interface ContextType {
  register: (key: string, initialValue: unknown) => unknown;
  update: (key: string, value: unknown) => void;
}

// 리터럴 타입을 기본 타입으로 확장
type Widen<T> =
  T extends boolean ? boolean :
  T extends number ? number :
  T extends string ? string :
  T;
```

### Safe Area Types

```typescript
interface ContextType {
  top: number;
  bottom: nu... (3KB 남음)
AID_USAGES.md
53KB