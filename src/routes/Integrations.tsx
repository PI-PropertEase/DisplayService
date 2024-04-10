import Drawer from "../components/Drawer";
import Navbar from "../components/Navbar";

export interface IIntegration {
    id: number;
    name: string;
    logo: string;
    status: string;
}

export default function Integrations() {

    const integrations: IIntegration[] = [
        {
            id: 1,
            name: "Airbnb",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhjdOxfU-CtLwXH1Gaz6rHryW5IVBURCsg-dEB_MFumQ&s",
            status: "Connected"
        },
        {
            id: 2,
            name: "Booking.com",
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEUAO5X///8ANJNhda8AJI3c4+8ALJDa4O0AOZSls9IAKo8ANpOlr84AL5EAJo7z9/sANJIAMZIAHoxMaaq/yd/p7fUAIY2ElsKWpcoAHIzm6/O2wdrJ0uStudVGZah+kL46XKRXcq91irsTRZprgbaOnMMyVaAjTZ2bqs0FQ5qzvtgAAIbGz+LT2ukqUZ9herMAD4n9mFbeAAAFcUlEQVR4nO2de3eiPBCHgSJGKGC84G3r/b5q9/t/ute+2+1pdeIaoGbC/p6/4zl5miG3GajjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAlRFeHKiJpWxGwnQfi9D0F8t+Q8m2v5q3104SxpHpnuZDZOMf7h10D6vxIPTsG8so7tzj905nGQeWOQox1BA8k75sEpuiVSSagv8P5Nq3ZxzDF33BMyMpTff8TqJ1LsFzrM4S032/j5xD+MbWjkhtpbkN3U5mgaLY5Bd03R8WBGpzVsTQPfAfRe+pkKHbYD+KRQ3dV+6LRmHDlPuRo7Ch+xKadrhNcUN3wXsQSzAc8Z5sSjB0HdaDqDJMt+M4/CDYvT6rTyA91tOpwvAYBJH4TDPInlSOvHc2tGGX2lN7g2eFYsg5TGnDCRl3IlvRhu3mo7utAW0YKFoPRqThKn5on/UgDbuZorXwyLPWXvUX4QBpWPdVzcMtZch6qtE0FDvKcKhszwBNQyerUVFdoTF0AupaJ40ZLxe6hnGfGkPOl+C6hnJe9SiVS6J9rUozjZwQ7Q9VGkPyOWxUaMV3QioRN+d8fNI1HFDbtg3jqVTXMJoSzbutR/ZYF03DhDpcvHB+DDUNIzLLMWadENYyFIMj0Zr1aqhnKFoNaghZz6RahlFGCnYHj+6zHncaikj60zol6C49E/2+H9rwp/+VVrieKGqKDqobDy6Qhmm99hV1Jpx96qnwrX6beYwWNpwzT605RQ17nI9N7xQyXFogWMhwxno/+of8hunUCsEiY/jicL5i+6DQc9hPOCed3ik2lw6nVV8tzutFi3ukFq5U2HOvbCtei9EZ8FYso57GwjO+JivW080Nw/QzNxVZHzCUho2plN4fpCc2sxV1DfX7b2FdpcJ5oduFXyuGhPDibKOqet8yjlPaMPXIK1CRnKgk95kd3/mUNlypNtVRdiANGReZ0oZCOSQio59Gvtc19E3UjVSLomiIb30iaXjznj6mMvluje2lom7+8C1Ou5Qi21pofUMnJisU2WYvchhGJ8qQbfVeDkMRUnNNneu9Ww5Dx6cWjJTripjHMNxTYcq1ti2PYUDmEblOprkMyYr2NdNsfi5D8ogxrZAhWRflnipk6JNHqAo9h0JSglWaS70ZJVil9TAkXyup0J5GCDJIR/QYimYcBHHTYATrG/r0dRR5BG76u9lq2+i/LnxjRw9tw3hGClLLoWjNPnawteXA0GqiXQVNFZieSa9/IhdfduhDQzljPUPhK0aQqDGN25dtlkamWw1D0Qyl8kMoVzWmkvhbzE2MIm346/p7ZqEft/fK9MXV3RX9CtjUQFacfv9w+3xJY1+/lZ1ZXk6VPlno1zXwPm0Z2bXzLHJ5l0jve4xcq5ZjOLtMryWKWk0DZf2lGHaunkJ63+OaOCeXYZhefYVPFaQmwrQMw+sUsFS81u66+4eviSUYTq47Td/kvNGx0LBP5GQqZdin9j9VitIJucFTf0HMtpkmHSvOvZHqF5atFiOpKqRRrviPf8GmgOGwrf5uYvPq6PSblUW7tu78ZvmsYudt4Moxp+HxaSBvdlY41M/GXE5Pf6G2Wvh/7aok4rRn4pCvazjcz3fZXbEWjy9/S68s303UHtbu4XjsNPrLk0iC29H5iYubqLRt6FY88u8jCYPYU9dKUYjW8uOVxWEvsKCuXx8vWcy3o06jd0ruHnrbEDIOw0AyzS0CAAAAAAAAQDXYme7AtwND+2H8WmNJcK07Lg8Y2g8M7WdjugPfDgzt5x8wrPxMc4Kh9axhaD0wtJ8pDK0HhvYDQ/sZw9B6eP9vkDKovmEbhtYDQ/uZwdB6YGg/1Td8gqHt/AeocVdliNL86wAAAABJRU5ErkJggg==",
            status: "Disconnected"
        },
        {
            id: 3,
            name: "TripAdvisor",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYWVWY53BXJrmtJfS849z7nNLYjjUgRiNFpgxOl2XFQ&s",
            status: "Disconnected"
        },
        {
            id: 4,
            name: "Expedia",
            logo: "https://1000logos.net/wp-content/uploads/2023/11/Expedia-Logo-2021.png",
            status: "Connected"
        },
        {
            id: 5,
            name: "Vrbo",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ldZs4gZcLkZ4CeceGF7AfJjwPb8AXkN21IwK7W5TFA&s",
            status: "Connected"
        },
        {
            id: 6,
            name: "Guesty",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoMiIIFlWI7Drw7qEc-Ychi5tjl8si_FNtp8iRdDCnCA&s",
            status: "Disconnected"
        },
        {
            id: 7,
            name: "Rentals United",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnVSL4s6YnnXaz5_-VxFkAK3lrDc2McOidqu03GPrLAw&s",
            status: "Connected"
        }
    ];

    return (
        <>
           <div className="flex flex-col">
             <Navbar />
             <div className="flex flex-row flex-1">
               <Drawer />
               <div className="flex flex-col flex-1 p-8 overflow-auto pt-28">
                 <div className="flex items-center justify-center">
                   <h1 className="text-4xl font-light text-accent">Connect to your external services and start synchronizing everything!</h1>
                 </div>
                 <div className="flex flex-wrap gap-8 items-center justify-center pt-16">
                   {integrations.map((integration) => (
                     <div key={integration.id} className={`relative flex flex-col items-center justify-center gap-4 p-4 shadow-sm shadow-base-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-xl ${integration.status === "Disconnected" && "cursor-pointer hover:bg-accent hover:bg-opacity-10 hover:transition-all hover:duration-500"  } `}>
                       <img src={integration.logo} alt={integration.name} className="w-24 h-24" />
                       <h2 className="text-2xl font-light">{integration.name}</h2>
                       {integration.status === 'Connected' && (
                        <div className="absolute inset-0 bg-neutral opacity-15 rounded-xl z-10"></div>
                       )}
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </div>
        </>
       );
       

}