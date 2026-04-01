import VerifyEmailForm from "@/components/modules/auth/VerifyEmailForm";

interface SearchParams {
  email?: string;
}

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { email } = await searchParams;

  if (!email) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Email address is required for verification.</p>
      </div>
    );
  }
  return <VerifyEmailForm email={email} />;
};

export default VerifyEmailPage;
