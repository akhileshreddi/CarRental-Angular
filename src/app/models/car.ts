export interface Car{
    id:number;
    make:string;
    type:string;
    model:string;
    reviews:number;
    avaliable_date:Date;
    price:number;
    place:string;
    fuel_type:"DIESEL" | "PETROL";
    seat_capacity:number;
    transmission_type: "AUTOMATIC" | "MANUAL";
    image:string;
    no_of_reviews:number;
    no_of_rides:number;
}




