import { OrderlistPipe } from './orderlist.pipe';
import * as mockRaw from '../../data/tracks.json'
import { TrackModel } from '@core/models/tracks.models';

describe('OrderlistPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderlistPipe();
    expect(pipe).toBeTruthy();
  });

  it('probando entrada y salida de valores', () => {
    /**TODO: el arrays de entrada es null, o si no se le pasa ningun argumento,
     * debe retornar el mismo arrays en la salida.
    */
    //TODO: Arrange
    const pipe = new OrderlistPipe();
    const mockTracks: any = (mockRaw as any).default;
    const { data } = mockTracks;

    //TODO: Act -> "pipe.transform" es la manera de usar un pipe dentro de un componente
    const result: TrackModel[] = pipe.transform(data)

    // TODO: Assert
    expect(result).toEqual(data);
  })

  it('P robar si se ordena de manera correcta Asc',()=>{
    //TODO: Arrange
    const pipe = new OrderlistPipe();
    const {data} : any = (mockRaw as any).default;
    const firstValue = data.find((i:any)=> i._id === 7) //50-cent
    const lastValue = data.find((i:any)=> i._id === 6) //50-cent

    //TODO: Act
    const result: TrackModel[] = pipe.transform(data,'name','asc');
    const firstResult = result[0];
    const lastResult = result[result.length -1];

    //TODO: Assert
    expect(firstResult).toEqual(firstValue);
    expect(lastResult).toEqual(lastValue);
  })

});
