export type RegisterFn = (codeDesignMethods: CodeDesignMethods, uuid?: string) => void;

export interface CodeDesignMethods {
  open: <T = any>(data?: T) => void;
  close: () => void;
  setProps: (props: Partial<CodeDesignProps>) => void;
}

export type UseCodeDesignReturnType = [RegisterFn, CodeDesignMethods];

export interface CodeDesignProps {
  mode: string;
  visible: boolean;
}
