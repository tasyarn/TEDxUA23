import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function Ticketing3({ tiket, payment }) {
    // console.log(payment);
    const options = {
        // weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const numberFormat = (value) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);


    const { data, setData, post, processing, errors } = useForm({
        // name: '',
        // email: '',
        bukti_pemb: '',
        id: payment.id
    });
    
    const [submitted, setSubmitted] = useState(false);

    function submit(e) {
        e.preventDefault();
        post('/payment');
        setSubmitted(true);
    }

    
    // console.log(data);

    return (
        <>
            <Head title="Ticketing" />
            <div className="min-h-screen bg-[url('/assets/bg-ticketing3.jpg')] grid justify-items-center pt-10 md:pt-44 pb-20">
                <div className="w-[350px] md:w-[700px] lg:w-[835px] mb-12 lg:mb-32">
                    <p className="font-capuchetrial text-white text-center lg:text-custom13 md:text-custom14 text-custom4">
                        MY TICKET
                    </p>
                </div>
                {(tiket.status !== 3) ? (
                    <>
                    <div>
                        <label htmlFor="file-input">
                            <div className="bg-white md:w-[700px] lg:w-[1200px] grid px-2 md:px-4 py-5 md:py-12 rounded-3xl md:rounded-[60px] gap-y-5 md:gap-y-12">
                                <div className="flex items-center gap-x-3 md:gap-x-7 justify-center">
                                    <div className="bg-[#A4161A] p-2 md:p-4 rounded-3xl">
                                        <p className="font-capuchetrial text-white md:text-[30px] lg:text-[52px] leading-none">
                                            UPLOAD FILE
                                        </p>
                                    </div>
                                    <p className="font-canopee text-black md:text-[33px] lg:text-[53px]">
                                        Upload Your Payment Receipt Here
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-6 justify-center">
                                    <div className="flex items-center gap-x-5">
                                        <img
                                            src="/assets/mandiri.jpg"
                                            alt="mandiri"
                                            className="rounded-xl drop-shadow-custom2 w-[40px] md:w-[60px] lg:w-[75px]"
                                        />
                                        <p className="font-migra md:text-[28px] lg:text-[36px]">
                                            1420021028823 &#40;Qanita Putri
                                            M&#41;
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-x-5">
                                        <img
                                            src="/assets/bca.jpg"
                                            alt="bca"
                                            className="rounded-xl drop-shadow-custom2 w-[40px] md:w-[60px] lg:w-[75px]"
                                        />
                                        <p className="font-migra md:text-[28px] lg:text-[36px]">
                                            6170821279 &#40;Mohammad Aditya&#41;
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-x-5">
                                        <img
                                            src="/assets/shopeepay.jpg"
                                            alt="shopeepay"
                                            className="rounded-xl drop-shadow-custom2 w-[40px] md:w-[60px] lg:w-[75px]"
                                        />
                                        <p className="font-migra md:text-[28px] lg:text-[36px]">
                                            085889734143 &#40;Aisyah Maldha&#41;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </label>
                    <div className="mt-4 md:mt-12 grid justify-center">
                        <form onSubmit={submit}>
                            <input
                                id="file-input"
                                type="file"
                                placeholder="Upload Your Payment Receipt Here"
                                className="sr-only"
                                onChange={(e) => setData('bukti_pemb', e.target.files[0])}
                            />
                            {(() =>{
                                if (data.bukti_pemb && !submitted ){
                                    return (
                                        <>
                                            <p className="font-canopee text-[15px] md:text-[25px] text-white text-center mb-2">Uploaded File : {data.bukti_pemb.name}</p>
                                            <InputError message={errors.bukti_pemb} className="mt-2" />
                                            <button className="font-canopee text-white bg-[#A4161A] px-12 text-[36px] md:text-custom4 lg:text-custom14 border-4 border-white rounded-[96px]" type="submit">
                                                SUBMIT
                                            </button>
                                         </>
                                    );
                                }else{
                                    return null;
                                }
                            })()}
                        </form>
                    </div>
                    </div>
                    </>
                ) : (
                    <></>
                ) }

                <div className="w-[370px] h-[520px] md:w-[700px] md:h-[1000px] lg:w-[1180px] lg:h-[1800px] bg-[url('/assets/ticket-card.png')] bg-contain bg-no-repeat mt-20 drop-shadow-[0_35px_15px_rgba(0,0,0,0.75)]">
                    <div className="border-[3px] md:border-4 border-black px-3 md:px-5 py-[2px] md:py-1 rounded-full w-fit h-fit mt-[87px] md:mt-[165px] lg:mt-[285px] mx-auto">
                    {(() => {
                        if (tiket.status == 1) {
                        return (
                            <p className="font-canopee text-[20px] md:text-[35px] lg:text-[60px] leading-tight">
                                <span className="text-[#A4161A]">STATUS :</span>WAITING
                                FOR PAYMENT
                            </p>
                        )
                        } else if (tiket.status == 2) {
                        return (
                            <p className="font-canopee text-[15px] md:text-[30px] lg:text-[55px] leading-tight">
                                <span className="text-[#c27a22]">STATUS :</span>UPLOAD SUCCES, WAITING
                                VERIFICATION
                            </p>
                        )
                        } else {
                        return (
                            <p className="font-canopee text-[20px] md:text-[35px] lg:text-[60px] leading-tight">
                                <span className="text-[#28b226]">STATUS :</span>
                                TICKET VERIFIED
                            </p>
                        )
                        }
                    })()}
                    </div>
                    <div className="w-fit h-fit mt-[50px] md:mt-[90px] lg:mt-[150px] ms-[70px] md:ms-[150px] lg:ms-[300px]">
                        <p className="font-canopee text-[25px] md:text-[50px] lg:text-[80px] leading-tight">
                            Ticket Details
                        </p>
                    </div>
                    <div className="w-fit h-fit mt-[15px] md:mt-[30px] lg:mt-[50px] ms-[70px] md:ms-[150px] lg:ms-[300px]">
                        <p className="font-canopee text-[20px] md:text-[35px] lg:text-[70px] text-[#A4161A] leading-tight">
                            Name
                        </p>
                        <p className="font-migra text-[15px] md:text-[30px] lg:text-[50px] leading-tight">
                            {tiket.user.name}
                        </p>
                    </div>
                    <div className="w-fit h-fit mt-[10px] md:mt-[20px] lg:mt-[25px] ms-[70px] md:ms-[150px] lg:ms-[300px]">
                        <p className="font-canopee text-[20px] md:text-[35px] lg:text-[70px] text-[#A4161A] leading-tight">
                            Email
                        </p>
                        <p className="font-migra text-[15px] md:text-[30px] lg:text-[50px] leading-tight">
                            {tiket.user.email}
                        </p>
                    </div>
                    <div className="w-fit h-fit mt-[10px] md:mt-[20px] lg:mt-[25px] ms-[70px] md:ms-[150px] lg:ms-[300px]">
                        <p className="font-canopee text-[20px] md:text-[35px] lg:text-[70px] text-[#A4161A] leading-tight">
                            Ticket Type
                        </p>
                        <p className="font-migra text-[15px] md:text-[30px] lg:text-[50px] leading-tight">
                            {tiket.paket.nama_paket}
                        </p>
                    </div>
                    <div className="w-fit h-fit mt-[10px] md:mt-[20px] lg:mt-[25px] ms-[70px] md:ms-[150px] lg:ms-[300px]">
                        <p className="font-canopee text-[20px] md:text-[35px] lg:text-[70px] text-[#A4161A] leading-tight">
                            Purchase Date
                        </p>
                        <p className="font-migra text-[15px] md:text-[30px] lg:text-[50px] leading-tight">
                            {new Date(tiket.created_at).toLocaleString(
                                "id-ID",
                                options
                            )}
                        </p>
                    </div>
                    <div className="w-fit h-fit mt-[10px] md:mt-[20px] lg:mt-[25px] ms-[70px] md:ms-[150px] lg:ms-[300px]">
                        <p className="font-canopee text-[20px] md:text-[35px] lg:text-[70px] text-[#A4161A] leading-tight">
                            Price
                        </p>
                        <p className="font-migraXB text-[15px] md:text-[30px] lg:text-[50px] leading-tight">
                            {numberFormat(tiket.paket.harga)}
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
            <Navbar />
        </>
    );
}