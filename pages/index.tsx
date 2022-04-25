import type {NextPage} from 'next'
import Head from 'next/head'
import {useEffect, useState} from "react";
import {DateTimeFormatter, LocalDateTime, nativeJs} from "@js-joda/core";
import {Locale} from "@js-joda/locale_en";
import React from 'react';


const Home: NextPage = () => {

    const [datetime, setDatetime] = useState<Date>(new Date());

    useEffect(() => {
        setInterval(() => {
            setDatetime(new Date())
        }, 1000);
    });


    const japaneseDate = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
        era: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        weekday: 'long'
    }).format(datetime)

    const localDateTime = LocalDateTime.from(nativeJs(new Date()));
    const englishDate = localDateTime.format(DateTimeFormatter.ofPattern("yyyy/MM/dd EEEE").withLocale(Locale.ENGLISH))

    return (
        <React.Fragment>
            <Head>
                <title>Now</title>
                <meta name="description" content="now"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div
                className="w-full flex flex-col gap-3 text-center justify-center place-content-center content-center justify-items-center h-screen">
                <div className="text-6xl font-bold">
                    今日は？
                </div>
                <label className="swap">
                    <input type="checkbox"/>
                    <div className="swap-on">
                        <div className="text-6xl font-bold">
                            {japaneseDate}
                        </div>
                    </div>
                    <div className="swap-off">
                        <div className="text-6xl font-bold">
                            {englishDate}
                        </div>
                    </div>
                </label>
                <div className="countdown text-6xl font-bold flex flex-row justify-center">
                    <span style={{'--value': localDateTime.hour()} as React.CSSProperties}/>:
                    <span style={{"--value": localDateTime.minute()} as React.CSSProperties}/>:
                    <span style={{"--value": localDateTime.second()} as React.CSSProperties}/>
                </div>
                {/*<div className="divider"/>*/}
                {/*<div className="text-6xl font-bold justify-center">Year Progress Bar</div>*/}
                {/*<progress className="progress w-80" value={localDateTime.dayOfYear()} max="365"/>*/}
                {/*<div className="text-3xl font-bold justify-center">{`${localDateTime.dayOfYear()}/365`}</div>*/}
            </div>

        </React.Fragment>
    )
}

export default Home
