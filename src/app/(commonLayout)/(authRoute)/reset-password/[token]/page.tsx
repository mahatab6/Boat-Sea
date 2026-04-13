import ResetPasswordForm from "@/components/modules/auth/ResetPasswordForm";


interface ResetParams {
  params: Promise<{ token: string }>;
}

const ResetPasswordPage = async ({ params }: ResetParams) => {
  const { token } = await params;

  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordPage;