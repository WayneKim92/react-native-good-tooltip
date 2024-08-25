export const getAnchorPoint = (placement: string, anchor: string) => {
  let x = 0;
  let y = 0;

  // vertical
  if (placement === 'top' && anchor === 'left') {
    x = 0;
    y = 1;
  }
  if (placement === 'top' && anchor === 'right') {
    x = 1;
    y = 1;
  }
  if (placement === 'top' && anchor === 'center') {
    x = 0.5;
    y = 1;
  }

  if (placement === 'bottom' && anchor === 'left') {
    x = 0;
    y = 0;
  }
  if (placement === 'bottom' && anchor === 'center') {
    x = 0.5;
    y = 0;
  }
  if (placement === 'bottom' && anchor === 'right') {
    x = 1;
    y = 0;
  }

  // horizontal
  if (placement === 'left' && anchor === 'top') {
    x = 1;
    y = 0;
  }
  if (placement === 'left' && anchor === 'center') {
    x = 1;
    y = 0.5;
  }
  if (placement === 'left' && anchor === 'bottom') {
    x = 1;
    y = 1;
  }
  if (placement === 'right' && anchor === 'top') {
    x = 0;
    y = 0;
  }
  if (placement === 'right' && anchor === 'center') {
    x = 0;
    y = 0.5;
  }
  if (placement === 'right' && anchor === 'bottom') {
    x = 0;
    y = 1;
  }

  return { x, y };
};
