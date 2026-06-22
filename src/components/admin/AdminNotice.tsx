type AdminNoticeProps = {
  error?: string;
  success?: string;
};

export function AdminNotice({ error, success }: AdminNoticeProps) {
  if (!error && !success) {
    return null;
  }

  return (
    <div
      className={
        error
          ? "rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
          : "rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm font-medium text-teal-800"
      }
    >
      {error ?? success}
    </div>
  );
}
