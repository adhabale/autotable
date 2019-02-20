
import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
    import * as XLSX from 'xlsx';
    import { AbstractControl, FormArray, FormBuilder, FormGroup,FormControl } from '@angular/forms';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const ELM:any[]=[
  {name:'Amruta',nationality:'Indian'},
    {name:'Aswini',nationality:'Indian'},
      {name:'Snehal',nationality:'Indian'},
        {name:'Mac',nationality:'US'}



]

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'auto-table',
  styleUrls: ['auto-table.component.css'],
  templateUrl: 'auto-table.component.html',
})
export class AutoTableComponent {
  dataSource=new BehaviorSubject<any[]>(ELEMENT_DATA)
    dataSource1=new BehaviorSubject<any[]>(ELM)

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    displayedColumns1: string[] = ['name', 'nationality'];

      rows: FormArray = this.fb.array([]);
    form: FormGroup = this.fb.group({ 'table': this.rows });

  //this.dataSource  ELEMENT_DATA;
      constructor(private fb: FormBuilder) { }



add(){
  //let c=this.dataSource.value
  let c=this.dataSource1.value
 // c.push({position:0, name: 'Neon', weight: 20.1797, symbol: 'Ne'})
  c.push({name: 'Neon', nationality: 'Ne'})
  //this.dataSource.next(c)
  this.dataSource1.next(c)
}

addRow(){
  // let c=this.dataSource1.value;
 // c.push({name: '', nationality: ''})
    const row = this.fb.group({
          name  : '',
          nationality:new FormControl()
        });
        this.rows.push(row);
}

//inside export class

arrayBuffer:any;
file:File;
data;
change(event) 
  {
  this.file= event.target.files[0]; 
  }

 Upload() {
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            this.data=XLSX.utils.sheet_to_json(worksheet,{raw:true})

            // let c=this.dataSource.value;
            // this.data.forEach(val=>{
            //     c.push(val)
            // })
    
            // this.dataSource.next(c)
            // console.log(this.dataSource.value)
             let c=this.dataSource1.value;
            this.data.forEach(val=>{
                c.push(val)
            })
    
            this.dataSource1.next(c)
            console.log(this.dataSource1.value)
        }
        fileReader.readAsArrayBuffer(this.file);
}





}
