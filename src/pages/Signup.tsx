
import { useState,FormEvent,ChangeEvent,useRef } from 'react'
import { useQuery,useMutation  } from '@tanstack/react-query';
import { getData } from '../utils/APIUtils.ts'; 
import ReCAPTCHA from 'react-google-recaptcha';

function Signup() 
{
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [confirmPassword,setConfirmPassword]=useState<string>('');
    const [idCheckStatus, setIdCheckStatus] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const recaptchaPublicKey:string ='6LftPikqAAAAAG092WYrnBruUZ61lCnmQJM4AnYc'
    // 폼 제출 핸들러
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
      }
    };
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync(); // reCAPTCHA 실행 후 토큰 획득
      if (token) {
        submitSignupForm(token);
      }
    }
  };


  
  const mutation = useMutation({
    mutationFn: async () => {
      const response:{res:string} = await getData(`/user/idJungbok?id=${id}`);
      return response.res;
    },
    onSuccess: (data) => {
      if(data==='true')
      {
        setIdCheckStatus(true)
        if(error=='이미 존재하는 id입니다.')
          setError('')
      }
      else
        setError('이미 존재하는 id입니다.')
    },
    onError: () => {
      setError('error')
    }
  });

  const handleIdCheck = () => {
    mutation.mutate();
  };




  const submitSignupForm = async (token: string) => {
   //회원가입 axios
  };

    return (
        <div>
        <section className=" flex flex-col items-center p-[10%]">
        <div className='flex devkor_logo pb-[60px] pt-[50%]'>
          <img className="w-51px h-51px flex-shrink-0" src='/src/assets/images/devkor_logo.svg' alt="DEVKOR Logo" />
          <span className="text-center font-montserrat text-[39px] font-bold leading-normal text-[#505156]">DEVKOR</span>
        </div>

        <p className='text-left mr-auto text-label-300  text-[18px] font-semibold pb-[5%] font-pre'>회원가입</p>
        <div className={`text-red-500 ${error?"visible":"invisible"} mr-auto text-sm`}>{error||'placeholder'}</div>
        <form className="w-[95%]" onSubmit={handleSignup}>
            {/* ID,PW 입력 필드 */}
            <div className='pb-[20%]'>
              <div className="w-full mt-4 flex">
                <input
                  type="text"
                  id="id"
                  name="id"
                  className="w-full h-12  px-3 py-2 border border-[#d9d9d9] rounded-md font-pre"
                  placeholder="아이디"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                  disabled={idCheckStatus}
                />
                <button className='bg-[#3D3D3D] ml-3 px-3 text-background whitespace-nowrap rounded-md font-pre'
                onClick={handleIdCheck}>
                    중복확인
                </button>
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


              <div className="w-full mt-4">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full h-12 px-3 py-2 border border-[#d9d9d9] rounded-md font-pre"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>


            <div className="flex bg-[#F4F4F4] w-full mt-4">
              <label className="w-full h-12 flex items-center border border-[#d9d9d9]  rounded-md overflow-hidden">
                {selectedImage ? (
                  <div className='px-3 font-pre text-[#D9D9D9]'>업로드 성공</div>
                ) : (
                  <div className="flex items-center justify-center  ">
                    <img src='/src/assets/images/camera.svg' className='p-2'/>
                    <span className='font-pre text-[#D9D9D9]'>프로필 이미지</span>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          

              
          </div>
            
            {/*로그인,회원가입 버튼 */}
            <div className="mt-6 flex space-x-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={recaptchaPublicKey} // 공개키를 여기에 설정하세요.
              size="invisible" // Invisible reCAPTCHA 설정
            />
              <button
                type="submit"
                className="flex-1 bg-label-200 text-background p-3 rounded-md font-pre"
              >
                회원가입
              </button>

            </div>
          </form>
        </section>
      </div>
    );
  }


export default Signup