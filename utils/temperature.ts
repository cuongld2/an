export async function convertStringToNumber(inputString: string | null | undefined):Promise<number>{

    if (inputString !== null ){

        const convertedString = Number(inputString).valueOf();
        if (!isNaN(convertedString)){
          return convertedString
        }else{
          console.log(convertedString);
          throw new Error("Invalid temperature in the page");
        }
        
      }else{
  
        throw new Error("Invalid temperature in the page");
      }
}


export async function convertFToC(fahrenheit: number | null | undefined):Promise<number>{
if (fahrenheit !=null && fahrenheit!= undefined){
  let celsius = (fahrenheit - 32) * 5/9;
  return Math.floor(celsius); 
}else
{
  throw new Error("Fahreint temperature is null or undefined");
}
}