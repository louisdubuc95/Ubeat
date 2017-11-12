<template>
    <div id="home">
        <div id="landing">
            <div id="landing-content">
                <h1>UBeat</h1>
                <h2>Create. Edit. Share.</h2>
                <p>With UBeat, you can easily create your playlists and share them with your friends!</p>
            </div>
        </div>

        <section id="description">
            <h3>See what you can do with UBeat</h3>
            <div class="pure-g">
                <div class="description-entry pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                    <div class="description-content">
                        <h4><i class="description-icon fa fa-folder-open"></i> Browse</h4>
                      <p>Browse through a variety of playlists with different genres!</p>
                    </div>
                </div>
                <div class="description-entry pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                    <div class="description-content">
                        <h4><i class="description-icon fa fa-plus-circle"></i> Create</h4>
                        <p>Create your own playlists and listen to them whenever you want!</p>
                    </div>
                </div>
                <div class="description-entry pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                    <div class="description-content">
                        <h4><i class="description-icon fa fa-pencil"></i> Edit</h4>
                        <p>Edit and customize your own playlists so it suits you!</p>
                    </div>
                </div>
                <div class="description-entry pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                    <div class="description-content">
                        <h4><i class="description-icon fa fa-share-alt"></i> Share</h4>
                        <p>Share playlist that you liked or created with your friends!</p>
                    </div>
                </div>
            </div>
        </section>
        <section id="templates">
            <h3>You should try it right now</h3>
            <div class="pure-g">
                <div class="templates-entry pure-u-1 pure-u-md-1-2">
                    <div class="templates-content">
                        <p><router-link to="/artist/148662">View our artist page</router-link></p>
                    </div>
                </div>
                <div class="templates-entry pure-u-1 pure-u-md-1-2">
                    <div class="templates-content">
                        <p><router-link to="/album/1204427627">View our album page</router-link></p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
#home #landing {
    height: 100vh;
}

#home #landing::before {
    content: "";
    background: url('/static/images/home-background.jpg')  0 0 no-repeat fixed;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
}

#home #landing #landing-content {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    color: #FFF;
}

#home #landing #landing-content h1,
#home #landing #landing-content h2,
#home #landing #landing-content p {
    filter: drop-shadow(0 0 3px black);
}

#home section {
    background-color: #ecf0f1;
    color: #2c3e50;
    padding: 50px 0;
}

#home section:nth-child(2n + 1) {
    background-color: transparent;
    color: #ecf0f1;
}

#home section h3 {
    margin: 0 0 30px 0;
    padding: 0;
    text-align: center;
    text-transform: uppercase;
}

#home section h4 {
    color: #1db954;
}

#home #description .description-entry {
    box-sizing: border-box;
    padding: 0 50px;
}

#home #templates .templates-entry {
    box-sizing: border-box;
    padding: 50px;
}

#home #templates .templates-content {
    background-color: #ecf0f1;
    box-sizing: border-box;
    padding: 75px 50px;
    position: relative;
}

#home #templates .templates-content p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    margin: 0;
    text-align: center;
}

#home #templates .templates-content a {
    color: #000;
    font-size: 1.5em;
    text-transform: uppercase;
    text-decoration: none;
    transition: font-size .3s;
}

#home #templates .templates-content a:hover {
    font-size: 1.8em;
}
</style>
