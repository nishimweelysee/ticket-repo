import React, { Component } from 'react';
import { GMap } from 'primereact/gmap';
import { Toast } from 'primereact/toast';
import { loadGoogleMaps, removeGoogleMaps } from './load/GoogleMaps';

export class GMapDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            googleMapsReady: false,
            dialogVisible: false,
            markerTitle: '',
            draggableMarker: false,
            overlays: null,
            selectedPosition: null
        };

        this.onMapClick = this.onMapClick.bind(this);
        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.onMapReady = this.onMapReady.bind(this);
    }

    componentDidMount() {
        loadGoogleMaps(() => {
            this.setState({ googleMapsReady: true });
        });
    }

    componentWillUnmount() {
        removeGoogleMaps();
    }

    onMapClick(event) {
        this.setState({
            dialogVisible: true,
            selectedPosition: event.latLng
        });
    }

    onOverlayClick(event) {
        let isMarker = event.overlay.getTitle !== undefined;

        if(isMarker) {
            let title = event.overlay.getTitle();
            this.infoWindow = this.infoWindow||new google.maps.InfoWindow();
            this.infoWindow.setContent('<div>' + title + '</div>');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());

            this.toast.show({severity:'info', summary:'Marker Selected', detail: title});
        }
        else {
            this.toast.show({severity:'info', summary:'Shape Selected', detail: ''});
        }
    }

    handleDragEnd(event) {
        this.toast.show({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
    }


    onMapReady(event) {
        this.setState({
            overlays: [
                new google.maps.Marker({position: {lat: -1.966162, lng: 30.081285}, title:"Intercore Group LTD Office"}),
                new google.maps.Polygon({paths: [
                    {lat: -1.966162, lng: 30.081285},
                ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
                }),
                new google.maps.Circle({center: {lat: -1.966162, lng: 30.081285}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
                new google.maps.Polyline({path: [{lat: -1.966162, lng: 30.081285}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
            ]
        })
    }


    render() {
        const options = {
            center: {lat: -1.966162, lng: 30.081285},
            zoom: 12
        };

        return (
            <div>
                <Toast ref={(el) => { this.toast = el; }}></Toast>

                {
                    this.state.googleMapsReady && (
                        <div className="card">
                            <GMap overlays={this.state.overlays} options={options} style={{width: '100%', minHeight: '320px'}} onMapReady={this.onMapReady}
                                onMapClick={this.onMapClick} onOverlayClick={this.onOverlayClick} onOverlayDragEnd={this.handleDragEnd} />
                        </div>
                    )
                }
            </div>
        );
    }
}