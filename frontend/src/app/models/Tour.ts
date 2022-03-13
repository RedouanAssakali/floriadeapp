import {Poi} from "./poi";

export class Tour{
  id: number;
  name: string;
  description: string;
  pois: [poi_id:Poi["id"] ,seq:number][]


  constructor() {


  }
}


