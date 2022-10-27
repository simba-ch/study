import { useAccess, Access } from 'umi';

export default function Test(props: any) {
  const { foo } = props;
  const access = useAccess(); // access 的成员: canReadFoo, canUpdateFoo, canDeleteFoo
  console.log("🚀 ~ file: index.tsx ~ line 6 ~ access", access)

  if (access.canReadFoo) {
    // 如果可以读取 Foo，则...
  }

  return (

    // <div>test</div>
    <div>

      <Access
        accessible={access.canReadFoo}
        fallback={<div>Can not read foo content.</div>}
      >
        Foo content.
      </Access>
      <Access
        accessible={access.canUpdateFoo}
        fallback={<div>Can not update foo.</div>}
      >
        Update foo.
      </Access>
      <Access
        accessible={access.canDeleteFoo(foo)}
        fallback={<div>Can not delete foo.</div>}
      >
        Delete foo.
      </Access>
    </div>
  );
};
