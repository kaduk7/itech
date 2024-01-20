import { createClient } from "@supabase/supabase-js"
import moment from "moment";

const currentTime = new Date();

export let supabaseUrl = 'https://zmwmwzonmcowypjqmdkj.supabase.co'
export let supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptd213em9ubWNvd3lwanFtZGtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2Mzk5NTgsImV4cCI6MjAyMTIxNTk1OH0.Sfc40sH-mRIz8IhYDUTQ3mOoEmY6JYYJ0aPRR1Ibjjo'
export let supabaseBUCKET = 'uploadfile'
export const supabase = createClient(supabaseUrl, supabaseKey)

export function kalkulasiWaktu(newsTime: any) {
    const timeDifference = currentTime.getTime() - new Date(newsTime).getTime();
    const Hari = Math.floor(timeDifference / (24 * 1000 * 60 * 60));
    const Jam = Math.floor(timeDifference / (1000 * 60 * 60));
    const Menit = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const Detik = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (Hari <= 0 && Jam <= 0 && Menit <= 0) {
        return ` Baru saja`;
    }
    if (Hari <= 0 && Jam <= 0) {
        return ` ${Menit} menit yang lalu`;
    }
    if (Hari <= 0 && Jam > 0) {
        return ` ${Jam} jam yang lalu`;
    }
    if (Hari > 0 && Hari <= 30) {
        return `${Hari} hari yang lalu`;
    }

    if (Hari > 30 && Hari <= 360) {
        const bulan = Math.floor(timeDifference / (24 * 1000 * 60 * 60) / 30);
        return `${bulan} bulan yang lalu`;
    }

    if (Hari > 360) {
        const tahun = Math.floor(timeDifference / (24 * 1000 * 60 * 60) / 360);
        return `${tahun} tahun yang lalu`;
    }
}

export const StyleSelect = {
    control: (provided: any, state: any) => ({
        ...provided,
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: 17,
        boxShadow: state.isFocused ? '0 0 0 2px #007bff' : null,
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        fontSize: 20,
        color: "black",
        fontFamily: "initial",
    }),
    menu: (provided: any) => ({
        ...provided,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }),
    menuList: (provided: any) => ({
        ...provided,
        maxHeight: '180px',
        overflowY: 'auto',
    }),
};

export const warnastatus = (status: any) => {
    switch (status) {

        case 'Proses':
            return 'lightblue';

        case 'Selesai':
            return 'green';

        case 'Tolak':
            return 'red';

        case 'Verifikasi':
            return 'yellow';

        case 'Dalam Proses':
            return 'lightblue';

    }
};

export const tglIndo = (value: any) => {
    return moment(value).format("DD-MM-YYYY")
}

export const rupiah = (value: any) => {
    return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
};

// const loadOptions = (inputValue: any, callback: any) => {
//     setTimeout(async () => {
//         if (inputValue.length < 2) {
//             callback([]);
//             return;
//         }
//         try {
//             const response = await axios.get(`/api/carikategori/${inputValue}`);
//             const data = response.data;
//             const options = data.map((item: any) => ({ label: item.nama, value: item.id }));
//             callback(options);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             callback([]);
//         }
//     }, 300);
// };
