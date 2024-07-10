import Header from "@/components/header"
type Props = { 
    children : React.ReactNode
}

const DashboardLayout = ({children} : Props) =>{
    return (
        
        <div>
        <Header />
        this is the DashboardLayout <br />
        {children}
        </div>
    )

}
export default DashboardLayout;