import Image from 'next/image'
import SigninFrom from './From';

const SignIn = () => {
    return (
        <div className="flex items-center justify-center min-h-screen" style={{
            backgroundImage: "url('/img/maintenance.jpg')", backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>

            <div className="card glass w-96 p-4 bg-primary opacity-80">
                <figure>
                    <Image src="/img/logo.jpg" width={400}
                        height={400}
                        alt="car!" />
                </figure>
                <div className="card-body">
                    <SigninFrom />
                </div>
            </div>
        </div >
    )
}

export default SignIn