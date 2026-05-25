/** 
 * 
 * toast at bottom
 * 3 at a time
 * expiryTime
 * cross for closure
 * **/

import {useState, useRef, useEffect, createContext, useContext} from 'react'
import { createPortal } from "react-dom";

const ToastContext = createContext()





export const ToastProvider = ({children}) => {
    const [queue,setQueue] = useState([])
    const running = useRef(null)

    const showToast = (text) => {
        let id = crypto.randomUUID()
        console.log('called')
        setQueue((prev) => {
            let toast = {
                id,
                text
            }
            const temp = [...prev]
            return [...temp,toast]
        })
        setTimeout(() => {
            setQueue(prev => {
                let temp = [...prev]
                console.log('prev',prev, id)
                return temp.filter(item => item.id !== id)
            })
        },5000)
    }

    console.log('queue',queue)

    const snackBar = createPortal(
    <div style={{position: 'absolute', right:0,bottom: 200, display:'flex', flexDirection:'column' }}>
      {
        queue.map(item => {
            return <div key={item.id}>{item.text}</div>
        })
      }
    </div>,
    document.body
  );
  

  
  return (
    <ToastContext.Provider value={{showToast}}>
        {children}
        {snackBar}
    </ToastContext.Provider>
  )
}


export const useToast = () => {
    return useContext(ToastContext)
}