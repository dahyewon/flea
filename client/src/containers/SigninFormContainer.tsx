import SigninForm from '@/components/organisms/SigninForm'
import { useAuthContext } from '@/contexts/AuthContext'
import { useGlobalSpinnerActionsContext } from '@/contexts/GlobalSpinnerContext'

interface SigninFormContainerProps {
  onSignin: (error?: Error) => void
}

const SigninFormContainer = ({ onSignin }: SigninFormContainerProps) => {
  const { signin } = useAuthContext()
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // 로그인 버튼을 눌렀을 때의 이벤트 핸들러
  const handleSignin = async (username: string, password: string) => {
    try {
      setGlobalSpinner(true)
      await signin(username, password)
      onSignin && onSignin()
    } catch (err: unknown) {
      if (err instanceof Error) {
        // 에러 내용 표시
        window.alert(err.message)
        onSignin && onSignin(err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return <SigninForm onSignin={handleSignin} />
}

export default SigninFormContainer