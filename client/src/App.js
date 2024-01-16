import TotalProducts from "./components/TotalProducts"
import  './App.css'
import { Button, Card, CardContent, Divider, Typography } from "@mui/material"
import AddProduct from "./components/AddProduct"
import ListProducts from "./components/ListProducts"
import { useState } from "react"
import OrderSummary from "./components/OrderSummary"
const App = () => {
 
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const handleOrderSummaryClick = () => {
      setShowOrderSummary(!showOrderSummary);
  };  
  return(
    <>
      <img className="background-image" src='./Foods.jpg' alt='Foods' />
      <Card className="card">
        <CardContent>
        {showOrderSummary ? ( <OrderSummary />) :
                       
                     (
                        <>
        <Typography className="header"  variant="h3">
       רשימת קניות
     </Typography>
          <TotalProducts />
          <AddProduct/>
          <Divider/>
          <ListProducts/>
          <Button
                                onClick={handleOrderSummaryClick}
                                sx={{
                                    background: 'linear-gradient(45deg, #FFD700, #FF4500, #8B0000)',
                                    color: 'black',
                                    height: 48,
                                    padding: '0 30px',
                                }}
                            >
                                <Typography sx={{ fontWeight: '600', color: 'black' }}>
                                    סיים הזמנה
                                </Typography>
                            </Button>
         </> )}
        </CardContent>
      </Card>
      
    </>
  )
}
export default App