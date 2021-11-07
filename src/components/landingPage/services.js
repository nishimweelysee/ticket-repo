import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed';

function servicesPage(props) {
    const url = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLN5Jtr1FsXeSTsRAXPzfTMex9WmEwvS7o&key=AIzaSyAPxxGJCxKigue92hLdDZiCEtoZIY19vic'
    const [videos, setVideos] = useState([]);
    const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/7KVFKqOD6xA");
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const results = data.items.map(item => {
                    return { title: item.snippet.title, video: item.contentDetails.videoId, image: item.snippet.thumbnails.standard.url }
                })
                setVideos(results);
            })
    }, [])

    const playVideo = (id) => {
        setVideoUrl(`https://www.youtube.com/embed/${id}`)        
    }
    return (
        <section id="clients" className="section-bg rounded-xl md:p-4">
            <div>
                <div className="section-header">
                    <h3 className="justify-center">Our Latest News</h3>
                    <p>Read, Like, subscribe and share to our lastest news</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 justify-around gap-4 px-1">
                    <div className="flex flex-col gap-2 bg-white rounded p-3">
                        <TwitterTimelineEmbed
                            sourceType="profile"
                            // The preferred screen name goes next: 
                            screenName="Intercore_Group"
                            // Style options goes here:
                            options={{ height: 500, display: 'block' }}
                        />
                        <TwitterFollowButton
                            screenName="Intercore_Group"
                        />
                    </div>
                    <div className="flex flex-col gap-2 bg-white rounded p-3">
                        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTitie-Best-Rwandan-Musician-1488775954756864%2F&tabs=timeline&height=600&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId=1208253569663633" style={{ border: 'none', overflow: 'hidden', height: '600px' }} scrolling="yes" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                    </div>
                    <div className="flex flex-col gap-2  bg-white rounded p-3" > 
                        <div>
                            <iframe id="ytplayer" type="text/html" className="w-full h-48"
                                src={`${videoUrl}?autoplay=1&loop=1&color=white&mute=1`}
                                frameBorder="0" allowFullScreen></iframe>
                        </div>
                        <div className="flex flex-col gap-2 max-h-56 overflow-scroll">
                            {
                                videos.map((v, i) => {
                                    return <div key={i} className="flex gap-2">
                                        <img width="20" height="20" src={v.image} />
                                        <p className="text-blue-800">{v.title}</p>
                                        <FontAwesomeIcon onClick={e => playVideo(`${v.video}`)} icon={faPlay} color={'red'} />
                                    </div>
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default servicesPage;