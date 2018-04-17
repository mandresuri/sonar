import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Estacion } from "../../app/models/estacion";


@Injectable()
export class EstacionesListService{
    private EstacionesList = this.db.list<Estacion>('estacion')
    
    constructor(private db: AngularFireDatabase){ }

    getEstacionesList(){
        return this.EstacionesList;
    }

    addEstacion(estacion:Estacion){
        return this.EstacionesList.push(estacion)
    }

    editEstacion(estacion:Estacion){
        return this.EstacionesList.update(estacion.key, estacion)
    }

    removeEstacion(estacion:Estacion){
        return this.EstacionesList.remove(estacion.key)
    }
}