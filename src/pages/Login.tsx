
import { useState,FormEvent} from 'react'
import { useNavigate } from 'react-router-dom';
function Login() 
{
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    // 폼 제출 핸들러
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 
        // 서버로 데이터 전송
        //try사용하기
        const response = await fetch('/api/login', {//링크는 교체
          method: 'POST',
          body: JSON.stringify({ id, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      console.log(id)
      //const data = await response.json();
      
      setError('에러에요')

  }
    const navigate = useNavigate(); 

      const handleSignup = () => {
        navigate('/signup'); // '/signup' 경로로 네비게이션
      };
    return (
      <div >
        <section className=" flex flex-col items-center p-[10%]">
        <div className='flex devkor_logo pb-[60px] pt-[50%]'>
          <img className="w-51px h-51px flex-shrink-0" src='/src/assets/images/devkor_logo.svg' alt="DEVKOR Logo" />
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
                />
              </div>
            </div>
            {/*로그인,회원가입 버튼 */}
            <div className="mt-6 flex space-x-4">
              <button
                type="button"
                onClick={handleSignup}
                className="flex-1 font-pre bg-onBackground text-label-200  p-3 rounded-md text-base font-normal leading-normal"
              >
                회원가입
              </button>
              <button
                type="submit"
                className="flex-1 font-pre bg-label-200 text-background p-3 rounded-md text-base font-normal leading-normal"
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