import { useState } from "react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import {GiCancel} from "react-icons/gi"

const Modall = ({ openModal, onClose }) => {

    const [value, setValue] = useState(0)
    const handleTabs = (e, val) => {
        setValue(val)
        console.warn(val);
    }
    function TabPanel(props) {
        const { children, value, index } = props
        return (

            <div>{
                value === index && (
                    <div>{children}</div>
                )
            }</div>
        )
    }
    if (!openModal) return null
    return (
        <>
            <div onClick={onClose} className='overlay'>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className='modalContainer'
                >
                 
                    <div className='closeBtn'>
                        <p className='closeBtn cross_btn' onClick={onClose}>
                            <GiCancel />
                        </p>
                        <div className='content'>
                            <AppBar position="static">
                                <Tabs value={value} onChange={handleTabs}>
                                    <Tab label="Card" />
                                    <Tab label="Paypal" />
                              
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                <span>Card Payment</span>
                                <input type="email" placeholder="Email" />
                                <input type="number" placeholder="Card Number" />
                                <input type="datetime-local" id="birthdaytime" name="birthdaytime" />
                                <button className="modal__btn">Pay $ 500</button>
                            </TabPanel>

                            <TabPanel value={value} index={1}>
                                <span>Paypal</span>
                                <input type="email" placeholder="Email" />
                                <input type="number" placeholder="Card Number" />
                                <input type="datetime-local" id="birthdaytime" name="birthdaytime" />
                                <button className="modal__btn">Pay $ 500</button>
                            </TabPanel>

                            
                        </div>

                    </div>
                </div>
            </div>

        </>);
}

export default Modall;