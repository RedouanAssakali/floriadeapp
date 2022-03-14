import {Component, Input, OnInit} from '@angular/core';
import {Poi} from "../../../models/poi";
import {PoiService} from "../../../services/poi.service";
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {ApiService} from "../../../services/wp-api.service";
import {Blog} from "../../../models/blog";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})



export class HomePageComponent implements OnInit {

  @Input()
 lang = localStorage.getItem('lang');
  pois: Poi[]
  faArrowCircleRight=faAngleRight;
  blogs: Blog[] =[];
  blog: Blog;

  payload: Blog ={
    id: undefined,
    title: undefined,
    content:undefined,
    image: undefined
  };


  constructor(private poisServce: PoiService, private wpApiService: ApiService) { }

  ngOnInit(): void {


    this.getPois();
    this.wpApiService.getBlogs().subscribe((data)=>{
      console.log(data)
      for (const blogRest of data) {
        this.payload = new Blog(); // will define an object with correct keys.

        console.log(blogRest.id)
        this.payload.id = blogRest.id;
        this.payload.title = blogRest.title.rendered;
console.log(this.getMedia(blogRest.featured_media))
        this.payload.image = this.getMedia(blogRest.featured_media).subscribe(data)=>{

        };


        this.blogs.push(this.payload)

      }


      })

  }

  getMedia(id:any):any{
  return   this.wpApiService.getMedia(id).subscribe((media)=>{
console.log(media.guid.rendered)
    })

  }


getBlogs(){
  this.wpApiService.getBlogs().subscribe((data)=>{
    console.log(data)
    this.blogs = data;

  });


}

  getPois(){
    this.poisServce.getPois().subscribe((data)=> {
        this.pois = data

      console.log(data)
      }
    )
  }

}
