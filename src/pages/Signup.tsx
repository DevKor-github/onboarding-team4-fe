
import { useState,FormEvent} from 'react'

function Signup() 
{
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [confirmPassword,setConfirmPassword]=useState<string>('');
    // 폼 제출 핸들러
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
          <img className="w-51px h-51px flex-shrink-0" src='/src/assets/devkor_logo.svg' alt="DEVKOR Logo" />
          <span className="text-center font-montserrat text-[39px] font-bold leading-normal text-[#505156]">DEVKOR</span>
        </div>

        <p className='text-left mr-auto text-[#2C2C2E] font-pretendard text-[18px] font-semibold pb-[5%]'>회원가입</p>
        {error && <div className='text-red-500  mr-auto text-sm'>{error}</div>}
        <form className="w-[95%]" onSubmit={handleSubmit}>
            {/* ID,PW 입력 필드 */}
            <div className='pb-[20%]'>
              <div className="w-full mt-4 flex">
                <input
                  type="text"
                  id="id"
                  name="id"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="아이디"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <button className='bg-[#3D3D3D] ml-3 px-3 text-[#FFF] whitespace-nowrap rounded-md'>
                    중복확인
                </button>
              </div>

              <div className="w-full mt-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="w-full mt-4">
                <input
                  type="file"
                  id="profileImg"
                  name="profileImg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="프로필이미지 이후수정"

                />
              </div>
        
            </div>
            {/*로그인,회원가입 버튼 */}
            <div className="mt-6 flex space-x-4">
              <button
                type="button"
                onClick={handleSignup}
                className="flex-1 bg-[#3D3D3D] text-[#FFF] p-3 rounded-md hover:bg-[#4A4A4A] focus:outline-none focus:ring-2 focus:bg-[#9E9E9E]"
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