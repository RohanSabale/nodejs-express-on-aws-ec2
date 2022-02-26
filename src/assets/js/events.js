import helpers from './helpers.js';


window.addEventListener( 'load', () => {
    //add event listner for blurBtn
    
    document.getElementById('blur-btn').addEventListener('click', ( e ) => {
        const blurBtn = document.getElementById('blur-btn');
        console.log("Run sucessfully123");
        
        
        if  (blurBtn.hidden){
            blurBtn.hidden = false;
        }
        else{
            blurBtn.hidden = true;
            console.log("Run sucessfully1");
            loadBodyPix(blurBtn);
        }
        
        

    function loadBodyPix(blurBtn) {
        const canvas = document.getElementById('canvas');


        const videoElement = document.getElementById('local');

        

        

        
        console.log("yououj");

        canvas.hidden = false;
        //videoElement.hidden = true;
        let options = {
        multiplier: 0.75,
        stride: 32,
        quantBytes: 4
        }
        bodyPix.load(options)
        .then(net => perform(net , blurBtn , canvas ))
        .catch(err => console.log(err))
    }
    
    async function perform(net , blurBtn,  canvas ) {
        let video =  document.getElementById('local');
        
        //ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        
        
        

        while (blurBtn.hidden) {
            console.log('loop');
        const segmentation = await net.segmentPerson(video);
    
        const backgroundBlurAmount = 7;
        const edgeBlurAmount = 2;
        const flipHorizontal = true;
    
        bodyPix.drawBokehEffect(
            canvas, video, segmentation, backgroundBlurAmount,
            edgeBlurAmount, flipHorizontal);
        }
    }
        
        
    });
    




    //When the chat icon is clicked
    document.querySelector( '#toggle-chat-pane' ).addEventListener( 'click', ( e ) => {
        let chatElem = document.querySelector( '#chat-pane' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( chatElem.classList.contains( 'chat-opened' ) ) {
            chatElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            chatElem.classList.remove( 'chat-opened' );
        }

        else {
            chatElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            chatElem.classList.add( 'chat-opened' );
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout( () => {
            if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300 );
    } );


    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById( 'local' ).addEventListener( 'click', () => {
        if ( !document.pictureInPictureElement ) {
            document.getElementById( 'local' ).requestPictureInPicture()
                .catch( error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error( error );
                } );
        }

        else {
            document.exitPictureInPicture()
                .catch( error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error( error );
                } );
        }
    } );


    //When the 'Create room" is button is clicked
    document.getElementById( 'create-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let roomName = document.querySelector( '#room-name' ).value;
        let yourName = document.querySelector( '#your-name' ).value;

        if ( roomName && yourName ) {
            //remove error message, if any
            document.querySelector('#err-msg').innerText = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', yourName );

            //create room link
            let roomLink = `${ location.origin }?room=${ roomName.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`;

            //show message with link to room
            document.querySelector( '#room-created' ).innerHTML = `Room successfully created. Click <a href='${ roomLink }'>here</a> to enter room. 
                Share the room link with your partners.`;

            //empty the values
            document.querySelector( '#room-name' ).value = '';
            document.querySelector( '#your-name' ).value = '';
        }

        else {
            document.querySelector('#err-msg').innerText = "All fields are required";
        }
    } );


    //When the 'Enter room' button is clicked.
    document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let name = document.querySelector( '#username' ).value;

        if ( name ) {
            //remove error message, if any
            document.querySelector('#err-msg-username').innerText = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', name );

            //reload room
            location.reload();
        }

        else {
            document.querySelector('#err-msg-username').innerText = "Please input your name";
        }
    } );


    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'expand-remote-video' ) ) {
            helpers.maximiseStream( e ); 
        }

        else if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            helpers.singleStreamToggleMute( e );
        }
    } );


    document.getElementById( 'closeModal' ).addEventListener( 'click', () => {
        helpers.toggleModal( 'recording-options-modal', false );
    } );
} );
