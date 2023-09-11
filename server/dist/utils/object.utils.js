"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUtils = void 0;
class ObjectUtils {
    static getIn(obj, path, def) {
        try {
            /**
         * If the path is a string, convert it to an array
         * @param  {String|Array} path The path
         * @return {Array}             The path array
         */
            var stringToPath = function (path) {
                // If the path isn't a string, return it
                if (typeof path !== 'string')
                    return path;
                // Create new array
                var output = [];
                // Split to an array with dot notation
                path.split('.').forEach(function (item, index) {
                    // Split to an array with bracket notation
                    item.split(/\[([^}]+)\]/g).forEach(function (key) {
                        // Push to the new array
                        if (key.length > 0) {
                            output.push(key);
                        }
                    });
                });
                return output;
            };
            // Get the path as an array
            path = stringToPath(path);
            // Cache the current object
            var current = obj;
            // For each item in the path, dig into the object
            for (var i = 0; i < path.length; i++) {
                // If the item isn't found, return the default (or null)
                if (typeof current[path[i]] === 'undefined')
                    return def;
                // Otherwise, update the current  value
                current = current[path[i]];
            }
            return current;
        }
        catch (error) {
            return;
        }
    }
    ;
    static cleanObj(obj) {
        obj = obj || {};
        return Object.keys(obj).reduce((acc, key) => (obj[key] === undefined
            || obj[key] === null
            || obj[key] === ''
            ? acc
            : Object.assign(Object.assign({}, acc), { [key]: obj[key] })), {});
    }
    static isEmptyObj(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }
    static isHasValue(obj) {
        return !this.isEmptyObj(obj);
    }
    static selects(obj, keys) {
        return keys.reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {});
    }
}
exports.ObjectUtils = ObjectUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL29iamVjdC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLFdBQVc7SUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFRLEVBQUUsSUFBWSxFQUFFLEdBQVM7UUFDMUMsSUFBSTtZQUNBOzs7O1dBSUQ7WUFDQyxJQUFJLFlBQVksR0FBRyxVQUFVLElBQVk7Z0JBQ3JDLHdDQUF3QztnQkFDeEMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO29CQUFFLE9BQU8sSUFBSSxDQUFDO2dCQUMxQyxtQkFBbUI7Z0JBQ25CLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQztnQkFDckIsc0NBQXNDO2dCQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxLQUFLO29CQUV6QywwQ0FBMEM7b0JBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRzt3QkFFNUMsd0JBQXdCO3dCQUN4QixJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzRCQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUNwQjtvQkFFTCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7WUFFRiwyQkFBMkI7WUFDM0IsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQiwyQkFBMkI7WUFDM0IsSUFBSSxPQUFPLEdBQVEsR0FBRyxDQUFDO1lBQ3ZCLGlEQUFpRDtZQUNqRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsd0RBQXdEO2dCQUN4RCxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVc7b0JBQUUsT0FBTyxHQUFHLENBQUM7Z0JBQ3hELHVDQUF1QztnQkFDdkMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtZQUNELE9BQU8sT0FBTyxDQUFDO1NBQ2xCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixPQUFPO1NBQ1Y7SUFDTCxDQUFDO0lBQUEsQ0FBQztJQUVGLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBUTtRQUNwQixHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUNoQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVM7ZUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSTtlQUNqQixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtZQUNsQixDQUFDLENBQUMsR0FBRztZQUNMLENBQUMsaUNBQU0sR0FBRyxLQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFFLENBQ3BDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDVixDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQ3pCLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1lBQ2xCLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLE9BQU8sS0FBSyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVztRQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFRLEVBQUUsSUFBYztRQUNuQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDakMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNWLENBQUM7Q0FDSjtBQTNFRCxrQ0EyRUMifQ==