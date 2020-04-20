import React, { PureComponent } from 'react'
import { CanvasOverlay } from 'react-map-gl'
let startPoint = null;
let endPoint = null;

export default class RouteComponet extends PureComponent {
  componentDidMount=()=>{
    fetch('https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=30IKt8m6kxH2QXAxtmt68x6vnkGbcQfil89hti5QbsI&waypoint0=geo!52.5,13.4&waypoint1=geo!52.5,13.45&mode=fastest;car;traffic:disabled')
        .then(res => res.json())
        .then((data) => {          
          startPoint = data.response.route[0].waypoint[0].mappedPosition;
          endPoint = data.response.route[0].waypoint[1].mappedPosition;
        })
        .catch(console.log)
  }
    _redraw ({ width, height, ctx, isDragging, project, unproject }) {
        const { points, color = 'red', lineWidth = 2, renderWhileDragging = true } = this.props
        ctx.clearRect(0, 0, width, height)
        ctx.globalCompositeOperation = 'lighter'
    
        if ((renderWhileDragging || !isDragging) && points) {
          ctx.lineWidth = lineWidth
          ctx.strokeStyle = color
          ctx.beginPath()
          points.forEach(point => {              
            const pixel = project([point.geometry.coordinates[0], point.geometry.coordinates[1]])
            ctx.lineTo(pixel[0], pixel[1])
          })
          ctx.stroke()
        }
      }
    
      render () {
        return <CanvasOverlay redraw={this._redraw.bind(this)} />
      }
}
