interface CheckboxProps {
  checked: boolean;
  onChange: (arg0: boolean) => any;
  small?: boolean;
  labelledBy?: string;
}

export default function Checkbox({
  checked,
  onChange,
  small = false,
  labelledBy,
}: CheckboxProps) {
  // TODO: if possible use a real checkbox input and style it.
  // Also, now clicking on the label does not work but it probably should
  return (
    <div
      data-small={!!small}
      data-checked={!!checked}
      className="
        flex items-center justify-center rounded-newDSminimal bg-color-newDSprimary cursor-pointer 
        w-[25px] data-[small=true]:w-[20px] 
        h-[25px] data-[small=true]:h-[20px]
        border-[2px] border-color-primary
        data-[small=true]:data-[checked=true]:bg-[#202020]
      "
      role="checkbox"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      onClick={() => onChange(!checked)}
    >
      {checked && !small && (
        <div className="flex p-0 m-0 w-[15px] h-[15px] bg-[#202020] rounded-newDSminimal" />
      )}
    </div>
  );
}
