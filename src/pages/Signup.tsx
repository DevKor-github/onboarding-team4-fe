
import { useState,FormEvent,ChangeEvent } from 'react'

function Signup() 
{
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [confirmPassword,setConfirmPassword]=useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    // 폼 제출 핸들러
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
      }
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 
        // 서버로 데이터 전송
        //try사용하기
        const response = await fetch('/api/signup', {
          method: 'POST',
          body: JSON.stringify({ id, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
      const data = await response.json();
      console.log(data);    
    

  }
    const handleSignup = () => {
      // 회원가입 버튼 클릭 시 처리
      console.log('회원가입 버튼 클릭됨');

    };
    return (
        <div>
        <section className=" flex flex-col items-center p-[10%]">
        <div className='flex devkor_logo pb-[60px] pt-[50%]'>
          <img className="w-51px h-51px flex-shrink-0" src='/src/assets/images/devkor_logo.svg' alt="DEVKOR Logo" />
          <span className="text-center font-montserrat text-[39px] font-bold leading-normal text-[#505156]">DEVKOR</span>
        </div>

        <p className='text-left mr-auto text-label-300 font-pretendard text-[18px] font-semibold pb-[5%] font-pre'>회원가입</p>
        <div className={`text-red-500 ${error?"visible":"invisible"} mr-auto text-sm`}>{error||'placeholder'}</div>
        <form className="w-[95%]" onSubmit={handleSubmit}>
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
                />
                <button className='bg-[#3D3D3D] ml-3 px-3 text-background whitespace-nowrap rounded-md font-pre'>
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
              <button
                type="button"
                onClick={handleSignup}
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