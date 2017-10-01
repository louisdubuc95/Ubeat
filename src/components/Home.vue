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
                        <p>Browse through a variety of playlist with different genre!</p>
                    </div>
                </div>
                <div class="description-entry pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                    <div class="description-content">
                        <h4><i class="description-icon fa fa-plus-circle"></i> Create</h4>
                        <p>Create your own playlist and listen to it whenever you want!</p>
                    </div>
                </div>
                <div class="description-entry pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                    <div class="description-content">
                        <h4><i class="description-icon fa fa-pencil"></i> Edit</h4>
                        <p>Edit and customize your own playlist so it suit you!</p>
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
                        <p><router-link to="/artist">View our artist page</router-link></p>
                    </div>
                </div>
                <div class="templates-entry pure-u-1 pure-u-md-1-2">
                    <div class="templates-content">
                        <p><router-link to="/album">View our album page</router-link></p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
