/**
 * Module contains setDisplayName helper.
 * @module shared/utils/setDisplayName
 */

/**
 * Used to assign display name to a method or a component.
 * @function
 * @category Func
 * @param {string} displayName - component`s display name.
 *
 * @return {function(*): *} returns static name setter.
 *
 * @example
 *      export const withContext = (Component) => setDisplayName('Provider')((props) => {
 *          return <div><Component { ...props } /></div>
 *      });
 */
export const setDisplayName = (displayName: string): HFC => {
    return (BaseComponent) => {
        BaseComponent[displayName] = displayName;

        return BaseComponent;
    };
};
