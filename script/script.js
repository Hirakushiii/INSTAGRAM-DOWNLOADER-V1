Swal.fire({
    title: "Hollaaa...",
    text: "Pastikan Akun Dari Pemilik Postingan Tidak Private Apalagi Postingan Closefriend..!",
    icon: "info"
  });

document.querySelector('#toggle').addEventListener('change', function(){
    // console.log(this.checked);
    if(!this.checked){
        return document.querySelector('html').setAttribute('data-theme',"cupcake");
    }else{
        return document.querySelector('html').setAttribute('data-theme',"night");
    }
});
// EVENT CLIPBOARD
document.querySelector('#clipboard').addEventListener('click', ()=>{
    if(navigator.clipboard){
        navigator.clipboard.readText().then(text => {
            const targetElement = document.querySelector('#input-link');
            targetElement.value = text;
        });
    }else{
        navigator.clipboard.readText().then(text => {
            console.log(text);
        });
    }
});

// EVENT DOWNLOAD
document.querySelector('#download-btn').addEventListener('click', async()=>{
    const input_key = document.querySelector('#input-link');
    if (input_key.value === '') {
        return Swal.fire({
            icon: "error",
            title: "Whoop...",
            text: "Mana Link Instagramnya...???"
        });
    }else if(!input_key.value.includes('instagram.com')){
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Link yang kamu berikan bukan dari instagram brok!"
        });
    }else if(input_key.value.includes('instagram.com') && input_key.value.includes('audio')){
        Swal.fire({
            title: "Error...",
            text: "Download Audio Instagram Sedang Dalam Perbaikan!",
            icon: "error"
          });
        // const apikey = 'https://api.nyxs.pw/dl/ig-audio?url=';
        // fetch(`${apikey}${input_key.value}`)
        //     .then((response) =>{
        //         if (!response.ok){
        //             console.error(response.statusText);
        //         };
        //         return response.json();
        //     }).then( async(Response) =>{
        //         if(Response.status === 'false'){
        //             return alert('link salah bro!');
        //             // console.log(Response);
        //         }else{
        //             document.querySelector('#download-area-foto').innerHTML = '';
        //             // console.log(Response.result);
        //             const alldata = Response.result[0];
        //             // console.log(alldata[0]);
        //             document.querySelector('#download-area').innerHTML = audio_fragment(alldata.url);
        //         }
        //     });
        // document.querySelector('#download-area').innerHTML = await loading();
        input_key.value = '';
    }else if(input_key.value.includes('instagram.com/reel')){
        const apikey = 'https://api.nyxs.pw/dl/ig?url=';
        fetch(`${apikey}${input_key.value}`)
            .then((response) =>{
                if (!response.ok){
                    console.error(response.statusText);
                };
                return response.json();
            }).then( async(Response) =>{
                if(Response.status === 'false'){
                    return alert('link salah bro!');
                    // console.log(Response);
                }else{
                    document.querySelector('#download-area-foto').innerHTML = '';
                    // console.log(Response.result);

                    const alldata = Response.result[0];
                    // console.log(alldata[0]);
                    document.querySelector('#download-area').innerHTML = video_fragment(alldata.url);
                }
            });
        document.querySelector('#download-area').innerHTML = await loading();
        input_key.value = '';
    }else if(input_key.value.includes('instagram.com/p')){
        const apikey = 'https://api.nyxs.pw/dl/ig?url=';
        fetch(`${apikey}${input_key.value}`)
            .then((response) =>{
                if (!response.ok){
                    console.error(response.statusText);
                };
                return response.json();
            }).then( async(Response) =>{
                if(!Response.status === 'true'){
                    return Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Link Bermasalah Brok!"
                    });  
                }else{
                    document.querySelector('#download-area').innerHTML = '';
                    // console.log(Response.result);
                    const alldata = Response.result;
                    let alldata_s = '';
                    let num = 0;
                    // console.log(alldata);
                    alldata.forEach(e => {
                        // console.log(e);
                        num += 1;
                        alldata_s += foto_fragment(e.url,`Download Slide #${num}`);
                        if (num <= 20) {
                            document.querySelector('#download-area-foto').innerHTML = alldata_s
                        }
                    });
                }
            });
        document.querySelector('#download-area-foto').innerHTML = await loading();
        input_key.value = '';
    }else if(input_key.value.includes('instagram.com/stories')){
        const apikey = 'https://api.nyxs.pw/dl/ig?url=';
        fetch(`${apikey}${input_key.value}`)
            .then((response) =>{
                if (!response.ok){
                    console.error(response.statusText);
                };
                return response.json();
            }).then( async(Response) =>{
                // if(Response.msg.includes('403')){ 
                //     return Swal.fire({
                //         icon: "error",
                //         title: "Oops...",
                //         text: "Fitur ini sedang dalam perbaikan, Silahkan datang kembali!"
                //     });                    
                // }else 
                let crak = Response.result;                
                if(Response.status === 'false'){
                    return Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Link Bermasalah Brok!"
                    }); 
                }else{
                    document.querySelector('#download-area').innerHTML = '';
                    const alldata = Response.result.url;
                    let alldata_s = '';
                    let s = 1;
                    await alldata.forEach(e => {
                        // console.log(e);
                        alldata_s += foto_fragment(e,`Download Story #${s}`);
                        s++
                    });
                    return document.querySelector('#download-area-foto').innerHTML = alldata_s
                }
            });
            document.querySelector('#download-area-foto').innerHTML = await loading();
            input_key.value = '';
        }else{
        alert('error!');
        input_key.value = '';
    }
})

// FRAGMENT
function video_fragment(a){
    return `
                <video src="${a}" class="mx-auto text-center rounded-t-xl" controls>
        </video>
            `;
        }
function foto_fragment(b,text){
    return `<a href="${b}" class="btn btn-primary w-full mb-1 ring-0 !text-black dark:text-white bg-gradient-to-r to-45% from-teal-300 to-purple-400 dark:bg-gradient-to-r dark:from-color-1 dark:to-color-2">${text}</a>
    `;
}
function loading(){
    return `<span class="loading loading-ball loading-lg text-teal-300 dark:text-color-1 mt-10"></span>
            <span class="loading loading-ball loading-lg text-black/35 dark:text-color-navbar"></span>
            <span class="loading loading-ball loading-lg text-purple-400 dark:text-color-2"></span>
            `;
}
