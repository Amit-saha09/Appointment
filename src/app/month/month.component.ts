import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { schedule } from '../model/schedule';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit,AfterViewInit {
 
  @ViewChild("fullcalendar")calendarComponent!:FullCalendarComponent;
  display = "none";
  display2 = "none";
  create: boolean =false;
title!:string;
calendarApi!:Calendar;
schedule:schedule[] | any=JSON.parse(localStorage.getItem('dataSource')!)
i:number=0;
schedulDetails:any;
form!: FormGroup;
createform!: FormGroup;
routerId!:any;
model:any;
submitted = false;
showToaster:boolean=false;
localStoreData:any=localStorage.getItem('dataSource');
data:any=[this.localStoreData];
months:any=[
  {id:1,name:"January"},
  {id:2,name:"Feburary"},
  {id:3,name:"March"},
  {id:4,name:"April"},
  {id:5,name:"May"},
  {id:6,name:"Jun"},
  {id:7,name:"July"},
  {id:8,name:"August"},
  {id:9,name:"September"},
  {id:10,name:"Octobar"},
  {id:11,name:"November"},
  {id:12,name:"December"},
]

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.schedule,
    eventClick: this.handleDateClick.bind(this),
  };
  config: any = {
    animated: true,
  }

  constructor(private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.createform = this.formBuilder.group(
      {
        firstName: ['', [Validators.required,Validators.maxLength(40)]],
        lastName: ['',[Validators.required,Validators.maxLength(40)]],
        email: ['', [Validators.required, Validators.email]],
        gender:[''],
        age:[],
        date:['',Validators.required],
        time:['',Validators.required]
      
      }
      
    );

    this.form = this.formBuilder.group({
      month:['']
    })
   this.routerId=this.route.snapshot.paramMap.get('id'); 
   this.loadData();
  }

  loadData(){
    let increment=0;
    for(let i=0;i<this.schedule?.length;i++){
      this.schedule[i].id=increment++;
      this.schedule[i].title=this.schedule[i]['firstName'];
      this.schedule[i].date=this.schedule[i]['date'];
      // this.schedule[i].color='F8441D';
     
     }
    //  this.ngOnInit();
  }
  get f() {
    return this.createform.controls;
  }

  ngAfterViewChecked(){
    this.calendarApi=this.calendarComponent?.getApi();
  }

  findScheduleById(Id:number){
   return this.schedule.find((o:any) => o.id == Id);
  }

  handleDateClick(arg:any) {
    console.log(arg.event.id);
    console.log();
    this.schedulDetails=this.findScheduleById(arg.event.id);
    console.log( this.schedulDetails);
    
    this.create=false;
    this.openModal2();
    this.title=arg.event.title;
  }
  createClick() {
    this.create=true;
    this.openModal();
  }

  onCreateSchedule(){
    //go to create schedule page

  }

  test():void{
    console.log('click');
    
    this.calendarApi.gotoDate('2022-03-01');
  }

  onChangeMonth(value:string){
    console.log('value',value.trim());
    
    let target;
    if(BigInt(value.trim())>9){
     target=`2022-${value}-01`
    }else{
      target=`2022-0${value}-01`
    }
    console.log('value',target);
    this.calendarApi.gotoDate(target);
}

ngAfterViewInit(): void {
  this.calendarApi=this.calendarComponent?.getApi();
  if(this.routerId){
    this.form.get('month')?.setValue(this.routerId)
    this.onChangeMonth(this.routerId);
  }
  
}


onSubmit(): void {
  this.submitted = true;
  if (this.createform.invalid) {
    return;
  }

  console.log(JSON.stringify(this.createform.value));
    var tempArray=[];
    tempArray =  JSON.parse(localStorage.getItem('dataSource')!) || [];
    tempArray.push(this.createform.value);
     console.log('temp array',tempArray);
    
  localStorage.setItem('dataSource',JSON.stringify(tempArray));
  
  // this.calendarApi.gotoDate(target);
  // console.log( this.calendarApi.refetchEvents());
  // this.calendarApi.handleData;
  // this.calendarApi.refetchEvents();
  this.router.navigate(['/month/'+1]);
  this.onCloseHandled();
  
 //close
}
onReset(): void {
  this.submitted = false;
  this.createform.reset();
}

openModal() {
  this.display = "block";
}
onCloseHandled() {
  this.display = "none";
}
openModal2() {
  this.display2 = "block";
}
onCloseHandled2() {
  this.display2 = "none";
}


}
