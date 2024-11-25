import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import StageBar from './components/StageBar/StageBar'
import { StageContextProvider } from './contexts/StageContext'
import { StageFormDataContextProvider } from './contexts/StageFormDataContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StageContextProvider>
      <StageFormDataContextProvider>
        <div className="flex h-full flex-col">
          <div>
            <Header />
            <StageBar />
          </div>
          <div className="flex-grow pb-12">
            <div className="flex-grow">{children}</div>
          </div>
          <Footer />
        </div>
      </StageFormDataContextProvider>
    </StageContextProvider>
  )
}
