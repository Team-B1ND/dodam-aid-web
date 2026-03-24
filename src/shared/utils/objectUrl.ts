export const createObjectUrl = (file: File | null | undefined) => {
  return file ? URL.createObjectURL(file) : undefined;
};

export const revokeObjectUrl = (url: string | undefined) => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};
