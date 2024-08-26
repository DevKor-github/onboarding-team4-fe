
import { useState,ChangeEvent,useRef } from 'react'
import { useMutation  } from '@tanstack/react-query';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import devkorImage from '/src/assets/images/devkor_logo.svg';

function Signup() 
{
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [confirmPassword,setConfirmPassword]=useState<string>('');
    const [userName,setUserName]=useState<string>('');
    const [idCheckStatus, setIdCheckStatus] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imgUrl, setImgUrl] = useState<string>('');
    const [recaptchaToken, setRecaptchaToken] = useState<string>('');
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const recaptchaPublicKey:string ='6LeaDi4qAAAAAP4Z9sI8QmAtK9cBPJTniOOFNsGw'
    // 폼 제출 핸들러
    const navigate = useNavigate(); 
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedFile(file); // 파일을 상태로 저장
      }
    };

    //회원가입
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync(); // reCAPTCHA 실행 후 토큰 획득
      if (token) {
        setRecaptchaToken(token)
        await submitSignupForm();
      }
    }
  };

  const submitSignupForm = async () => {
    if(confirmPassword===password)
      if(idCheckStatus===true)
        postSignup.mutate();
      else
        setError('id중복확인을 해주세요.')
    else
      setError('비밀번호와 비밀번호 확인이 서로 다릅니다.')

  };


  const postSignup=useMutation({
    mutationFn: async () => {
      if (selectedFile) {
      const imgformData = new FormData();
      imgformData.append('image', selectedFile);
      const response = await axios.post('/File/upload', imgformData, {
        headers: {
          'Content-Type': 'multipart/form-data', // FormData 전송을 위한 헤더 설정
        },
      });//api
      setImgUrl(response.data.data.url)
      //console.log(response.data.data.url)
      }
      const formData = new FormData();
      formData.append('userId', id);
      formData.append('password',password);
      formData.append('userNick', userName);
      if(imgUrl){
        //console.log(imgUrl)
        formData.append('profileImage', imgUrl);
      }
      formData.append('recaptchaToken', recaptchaToken);


      
      //console.log('aa')
      const response = await axios.post('/auth/signup', {userId:id,password:password,userNick:userName,profileImage:imgUrl,recaptchaToken:recaptchaToken});//api
      console.log(response.data.data)
      return response.data.data;
    },
    onSuccess: (data) => {
      if(data.message==="Success")
      {
        navigate('/login'); 
      }
      else
      {
        setError('회원가입 실패.')
      }
    },
    onError: () => {
      setError('error')
    }
  });

  //id중복 검사
  const idcheck = useMutation({
    mutationFn: async () => {
      const response: {message:string,data:boolean} = (await axios.get(`/user/idJungbok?id=${id}`)).data;//api
      console.log(response)
      return response.data;
    },
    onSuccess: (data) => {
      //console.log(data)
      if(data==true)
      {
        setIdCheckStatus(true)
        if(error=='이미 존재하는 id입니다.')
          setError('')
      }
      else
        setError('이미 존재하는 id입니다.')
    },
    onError: (error) => {
      console.log(error)
      setError('error')
    }
  });

  const handleIdCheck = () => {
    idcheck.mutate();
  };





    return (
        <div className="h-screen">
        <section className=" flex flex-col items-center p-[10%]">
        <div className='flex devkor_logo pb-[60px] pt-[50%]'>
          <img className="w-51px h-51px flex-shrink-0" src={devkorImage} alt="DEVKOR Logo" />
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
                    type="userName"
                    id="userName"
                    name="userName"
                    className="w-full h-12 px-3 py-2 border border-[#d9d9d9] rounded-md font-pre"
                    placeholder="사용자 이름"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                {selectedFile ? (
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