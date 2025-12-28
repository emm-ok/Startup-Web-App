import Navbar from '../../components/Navbar'
import FeedbackButton from '../../components/FeedbackButton'
import FeedbackTest from '../../components/FeedbackTest'

export default function Layout ( {children }: Readonly<{children: React.ReactNode}>) {
    return (
        <main className='font-work-sans'>
            <Navbar />
            {children}
            <FeedbackButton />
            <FeedbackTest />
        </main>
    )
}