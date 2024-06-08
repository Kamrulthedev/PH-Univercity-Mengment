import { TCoures } from "./Coures.interface";
import { Coures } from "./Coures.model";

const createCoures = async (payload: TCoures) => {
  const result = await Coures.create(payload);
  return result;
};

const getAllCoures = async () => {
    const result = await Coures.find();
    return result;
};

const getSingleCoures = async (id:string) =>{
    const result = await Coures.findById(id);
    return result
};

const deleteCoures = async(id:string) =>{
    const result = await Coures.findByIdAndUpdate(
        id,
    {isDeleted:true},
    {new :true}
)
return result
};

export const CouresService = {
    createCoures, 
    getAllCoures,
    getSingleCoures,
    deleteCoures
};
