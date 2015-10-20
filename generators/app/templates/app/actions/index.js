export const NAME_CHANGED = 'NAME_CHANGED';

export function changeName(name) {
  return {
    type:NAME_CHANGED,
    name
  };
}
