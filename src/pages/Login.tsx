
import { useState,useRef} from 'react'
import { useMutation  } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAtom } from 'jotai';
import { userTokenAtom } from '../atom/userAtom';
import devkorImage from '/src/assets/images/devkor_logo.svg';
function Login() 
{
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [recaptchaToken, setRecaptchaToken] = useState<string>('');
   const recaptchaPublicKey:string ='6LeaDi4qAAAAAP4Z9sI8QmAtK9cBPJTniOOFNsGw'
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const [, setUserToken] = useAtom(userTokenAtom);


    
const LoginSubmit = useMutation({
    mutationFn: async () => {
      const response:{data:{message:string,data:{messsage:string,accessToken:string}}} = await axios.post(`/auth/login`
        , { userId: id, password: password, recaptchaToken: recaptchaToken }
      );//api
      console.log(response.data)
      return response.data.data;
    },
    onSuccess: (data) => {
      console.log(data.messsage)
      if(data.messsage==='success')
      {
       //setError('로그인 성공')
        const token:string=data.accessToken;
        setUserToken(token)
        console.log(token)
        navigate('/'); 
      }
      else
      {
          setError('아이디 또는 비밀번호가 올바르지 않습니다.')
      }
    },
    onError: () => {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync(); // reCAPTCHA 실행 후 토큰 획득
      if (token) {
        setRecaptchaToken(token)
        console.log(token)
        await submitLoginForm();
      }
    }
  };
  const submitLoginForm = async () => {
    LoginSubmit.mutate();
  };


    const navigate = useNavigate(); 

      const handleSignup = () => {
        navigate('/signup'); // '/signup' 경로로 네비게이션
      };
    return (
      <div  className="h-screen">
        <section className=" flex flex-col items-center p-[10%]">
        <div className='flex devkor_logo pb-[60px] pt-[50%]'>
          <img className="w-51px h-51px flex-shrink-0" src={devkorImage} alt="DEVKOR Logo" />
          <span className="text-center font-montserrat text-[39px] font-bold leading-normal text-[#505156]">DEVKOR</span>
        </div>
        <p className='text-left mr-auto font-pre text-label-300 text-[18px] font-semibold pb-[5%]'>로그인</p>
        <div className={`text-red-500 ${error?"visible":"invisible"} mr-auto text-sm`}>{error||'placeholder'}</div>
        <form className="w-[95%]" onSubmit={handleSubmit}>
            {/* ID,PW 입력 필드 */}
            <div className='pb-[20%]'>
              <div className="w-full mt-4">
                <input
                  type="text"
                  id="id"
                  name="id"
                  className="w-full px-3 h-12  py-2 border border-[#d9d9d9] rounded-md font-pre"
                  placeholder="아이디"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </div>

              <div className="w-full mt-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full h-12 px-3 py-2 border border-[#d9d9d9] rounded-md font-pre"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {/*로그인,회원가입 버튼 */}
            <div className="mt-6 flex space-x-4">
              <button
                type="button"
                onClick={handleSignup}
                className="flex-1 font-pre bg-onBackground text-label-200 p-3 rounded-md text-base font-normal leading-normal"
              >
                회원가입
              </button>
             
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaPublicKey} // 공개키를 여기에 설정하세요.
                  size="invisible" // Invisible reCAPTCHA 설정
                />
                <button
                  type="submit"
                  className="flex-1 bg-label-200 text-background p-3 rounded-md font-pre"
                >
                  로그인
                </button>


            </div>
          </form>
        </section>
      </div>
    );
  }


export default Login