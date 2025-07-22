import {registerDecorator , ValidationOptions , ValidationArguments} from 'class-validator'

export function IsSimilar (property : string , ValidationOptions? : ValidationOptions){
    return function ( object : Object,  PropertyName : string){
        registerDecorator ({
            name : 'IsSimilar',
            target : object.constructor,
            propertyName : PropertyName,
            constraints : property as any,
            options : ValidationOptions,
            validator : {
                validate : (value : unknown , args : ValidationArguments) => {
                   
                    const relatedPropertyName = args.constraints as any
                   
                    const relatedValue = args.object[relatedPropertyName]
                  
                    return  value === relatedValue
                }
            }
        })

    }
}