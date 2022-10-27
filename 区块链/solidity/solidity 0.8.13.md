# 基础

## 智能合约入门

## 安装 solidity 编译器

## 根据例子学习 Solidity

# SOLIDITY 详解

## Solidity 源文件结构

源文件可以包含*任意数量*的**合约定义**，**源文件引入**，**pragma**、**using for**指令和**struct**，**enum**，**function**，**error**以及**常量定义**

### SPDX 版权许可标识

如下：在源文件的顶部，使用`SPDX-License-Identifier:`加支持的[SPDX 许可标识](https://spdx.org/licenses/)，来说明其版权的许可证
`UNLICENSEN`：如果你不想指定一个许可证，或如果源代码不开源，请使用这个特殊的标识符。**请注意：**`UNLICENSEN`（不存在与 SPDX 许可证列表中）与`UNLICENSE`（授予所有人所有权）不同

```sol
// SPDX-License-Identifier: MIT
```

### Pragmas 和版本标识

`pragma`：关键字，配合标识符来告诉编译器一些额外信息
标识符：

- `solidity`加版本号表示当前文件的使用的 solidity 哪个版本的语法规则，告诉编译器用指定的版本去编译文件
- `experimental`来表示启用一些新的编译器的功能或语法特性（通常都是实验性质的，没有最终成为标准，随时可能被废弃）
  版本号：`0.x.0`或者 `x.0.0`

- 避免了以后版本出现不兼容的更新，文件编译报错
- 版本标识通常只对本文件有效
- 如果引入了其他文件，标识并不会从被导入的文件，加入到导入文件中

```sol
//当前文件只允许高于0.4.0并且低于0.9.0的编译器编译
pragma solidity >=0.4.0 <0.9.0
//开启SMT solver 额外的安全检查
pragma experimental SMTChecker
```

### 导入其他源文件

filename:是导入路径
导入路径：

```sol
//下面创建了新的symbolName全局符号，它的成员都来自导入的filename文件中的全局符号
import 'filename' as symbolName
//如果存在命名冲突，可以在导入时重命名
import {symbol1 as alias,symbol2} from 'filename'
```

### 注释

可以使用单行注释`//`和多行注释`/*...*/`
此外，有另一种注释称为 NatSpec 注释，NatSpec 注释使用`///`或`**`注释，应该直接在函数声明和语句上方使用

```sol
// 这是一个单行注释。

/*
这是一个
多行注释。
*/
```

## 合约结构

在 Solidity 语言中，合约类似于其他面向对象编程语言中的 **_类_**
每个合约中可以包含**状态变量**、**函数**、**函数修改器（modifier）**、**事件 Event**，**错误 Errors**、**结构体**和**枚举类型**的声明，且合约可以从其他合约继承

还有一些特殊的合约，如：**库** 和 **接口**

### 状态变量

状态变量是可以永久的储存在合约储存中的值

```sol
pragma solidity >=0.4.0 <0.9.0;

contract TinyStorage {
    uint storedXlbData; // 状态变量
    // ...
}

```

### 函数

函数是代码的可执行单位。函数通常在合约内部定义，但也可以在合约外定义
函数调用可发生在合约内部或外部，且函数对其他合约有不同程度的可见性（可见性和 getter 函数）
函数可以接受参数和返回值

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.1 <0.9.0;

contract TinyAuction {
    function Mybid() public payable { // 定义函数
        // ...
    }
}

// Helper function defined outside of a contract
function helper(uint x) pure returns (uint) {
    return x * 2;
}
```

### 函数修改器（modifier）

函数修改器（modifier）可以用来以声明的方式修改函数的语义
重载（Overloading），表示有同样的修改器（modifier）名称但是有不同的参数的情况，这是不允许的。
而例如函数或修改器则可以被重写（overridden）

```sol
pragma solidity >=0.4.22 <0.9.0;

contract MyPurchase {
    address public seller;

    modifier onlySeller() { // 修改器
        require(
            msg.sender == seller,
            "Only seller can call this."
        );
        _;
    }

    function abort() public onlySeller { // 修改器用法
        // ...
    }
}
```

### 事件 Event

事件是能方便的调用以太坊虚拟机日志功能的接口

```sol
pragma solidity >=0.4.21 <0.9.0;
contract TinyAuction {
    event HighestBidIncreased(address bidder, uint amount); // 事件

    function bid() public payable {
        // ...
        emit HighestBidIncreased(msg.sender, msg.value); // 触发事件
    }
}
```

### 错误 Errors

Solidity 为应对失败，允许用户定义`error`来描述错误的名称和数据。错误可以在`revert statements`中使用，
跟用错误字符串相比，`error`更便宜并且允许你编码额外的数据，还可以用 NatSpec 为用户去描述错误

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

/// 没有足够的资金用于转账， 参数 `requested` 表示需要的资金，`available` 表示仅有的资金。

error NotEnoughFunds(uint requested, uint available);

contract Token {
    mapping(address => uint) balances;
    function transfer(address to, uint amount) public {
        uint balance = balances[msg.sender];
        if (balance < amount)
            revert NotEnoughFunds(amount, balance);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        // ...
    }
}
```

### 结构体

结构体是可以将几个变量分组的自定义类型

```sol
pragma solidity >=0.4.0 <0.9.0;

contract TinyBallot {
    struct Voter { // 结构体
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }
}
```

### 枚举类型

枚举可用来创建由一定数量的**常量值**构成的自定义类型

```sol
pragma solidity >=0.4.0 <0.9.0;

contract Upchain {
    enum State { Created, Locked, InValid } // 枚举
}

```

## 类型

Solidity 是一种静态类型语言，这意味着每个变量（状态变量和局部变量）都需要在编译时指定变量的类型
Solidity 提供了几种基本类型，并且基本类型可以用来组合出复杂类型
除此之外，类型之间可以在包含运算符号的表达式中进行交互。
`undefined` 和 `null`值的概念在 Solidity 中不存在，但是新声明的变量总有一个默认值，具体的默认值跟类型相关。
要处理任何意外的值，应该使用错误处理来恢复整个交易，或者返回一个带有第二个`bool`值的元组表示成功

### 值类型

以下类型也成为值类型，因为这些类型的变量将始终按值来传递。也就是说，当这些变量被用作函数参数或者用在赋值语句中时，总会进行值拷贝。

- 布尔类型（bool）：可能取值为字面常量`true` 和 `false`
- 整型（int / uint）：分别表示有符号和无符号的不同的位数的整型变量。支持关键字`uint8`到`uint256`(无符号，从 8 位到 256 位)以及`int8`到`int256`，以`8`位为步长递增。`uint` 和 `int`分别是`uint256`和 `int256`的别名。对于整型`X`，可以使用`type(X).min`和`type(X).max`去获取这是类型的最小值和最大值。
- 定长浮点型（fixed / ufixed）：表示各种大小的有符号和无符号的定长浮点型。在关键字`ufixedMxN` 和 `fixedMxN`中，`M`表示该类型占用的位数，`N`表示可用的小数位数。`M`必须能整除 8，即 8 到 256 位。`N`则可以是从 0 到 80 之间的任意数。`ufixed`和 `fixed`分别是`ufixed128x19`和`fixed128x19`的别名。
- 地址类型（address）：
  地址类型有两种形式，它们大致相同：
  - `address`：保存一个 20 字节的值（以太坊地址的大小）
  - `address payable`：可支付地址，与`address`相同，不过有成员函数`transfer` 和 `send`。可以向该地址发送以太币
    允许从`address payable` 到 `address` 的隐式转换，而从`address` 到 `address payable`必须显式的转换，通过`payable(address)`进行转换。
    地址类型成员：
    - `balance`属性：可以使用`balance`属性查询一个地址的余额
    - `transfer`方法：使用`transfer`方法向一个可支付的地址发送以太币
    - `call`，`delegatecall`，`staticcall`：为了与不符合应用二进制接口的合约交互，或者要更直接的控制编码，提供了函数`call`，`delegatecall`和 `staticcall`。它们都带有一个`betys memory`参数和返回执行成功状态（`bool`）和数据（`betys memory`）。其中，`call`可以接受任意类型，任意数量的参数，这些参数会被打包到以 32 字节为单位的连续的区域中存放。其中一个例外是当第一个参数被编码成正好 4 个字节的情况。在这种情况下，这个参数后边不会填充后续参数编码，以允许使用函数签名。
    ```sol
      bytes memory payload = abi.encodeWithSignature("register(string)", "MyName");
      (bool success, bytes memory returnData) = address(nameReg).call(payload);
      require(success);
    ```
    - `code`，`codehash`：你可以查询任何智能合约的部署代码。使用`.code`来获取 EVM 的字节码，其返回`betys memory`，值可能是空。使用`.codehash`获得该代码的 Keccak-256 哈希值（为`bytes32`）。注意，`addr.codehash`比使用`Keccak256(addr.code)`更便宜。
- 合约类型：
  每一个 contract 定义都有它自己的类型。
  您可以隐式的将合约转换为从它们继承的合约。
  合约可以显式转换为`address`类型。
  只有当合约具有接收 receive 函数或 payable 回退函数时，才能显式和`address payable`类型相互转换，转换仍然使用`address(x)`执行，如果合约类型没有接收或 payable 回退功能，则可以使用`payable(address(x))`转换为`address payable`
  如果声明一个合约类型的局部变量（`MyContract c`），则可以调用合约的函数。注意需要赋相同合约类型的值给它
  您还可以实例化合约（即新创建一个合约对象）。
  合约和`address`的数据表示是相同的。
  合约不支持任何运算符
  合约类型的成员是合约的外部函数及 public 的状态变量
  对于合约`C`可以使用`type(C)`获取合约的类型信息
- 定长字节数组：
  关键字：`bytes1`，`betys2`，`betys3`，……，`bytes32`
  成员：
  `length`属性：表示这个字节数组的长度（只读）
- 变长字节数组：
  `bytes`：变长字节数组，它并不是值类型
  `string`：变长 UTF-8 编码字符串类型，它并不是值类型
- 地址字面常量：类似于`0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF`这种通过地址校验和测试的字面量就是地址字面常量
- 有理数和整数字面常量：
- 字符串字面常量及类型：字符串字面常量是指由双引号或单引号引起来的字符串。字符串字面常量只能包含可打印的 ASCII 字符。它们可以隐式的转换成`betys1`，……，`betys32`，如果合适的话，还可以转换成`betys`以及`string`。
- Unicode 字面常量：常规字符串文字只能包含 ASCII，而 Unicode 文字（以关键字 unicode 为前缀）可以包含任何有效的 UTF-8 序列。它们还支持与转义序列完全相同的字符作为常规字符串文字。

```sol
string memory a = unicode"Hello 😃";
```

- 十六进制字面常量：十六进制字面常量以关键字`hex`打头，后面紧跟着用单引号或双引号引起来的符号。例如：`hex"001122FF"`，字符串的内容必须是一个十六进制的字符串，它们的值将使用二进制表示。十六进制字面常量跟字符串字面常量很类似，具有相同的转换规则。

- 枚举类型：枚举是在 Solidity 中创建用户定义类型的一种方法。它们是显示所有整型相互转换，但不允许隐式转换。从整型显式转换枚举，会在运行时检查整数时候在枚举范围内，否则会导致异常（Panic 异常）。枚举需要至少一个成员，枚举不能多于 256 个成员。
  使用`type(NameOfEnum).min` 和 `type(NameOfEnum).max`你可以得到给定枚举的最小值和最大值。
  枚举还可以在合约或库定义之外的文件级别上声明

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

contract test {
    enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
    ActionChoices choice;
    ActionChoices constant defaultChoice = ActionChoices.GoStraight;

    function setGoStraight() public {
        choice = ActionChoices.GoStraight;
    }

    // 由于枚举类型不属于 |ABI| 的一部分，因此对于所有来自 Solidity 外部的调用，
    // "getChoice" 的签名会自动被改成 "getChoice() returns (uint8)"。

    function getChoice() public view returns (ActionChoices) {
        return choice;
    }

    function getDefaultChoice() public pure returns (uint) {
        return uint(defaultChoice);
    }

    function getLargestValue() public pure returns (ActionChoices) {
        return type(ActionChoices).max;
    }

    function getSmallestValue() public pure returns (ActionChoices) {
        return type(ActionChoices).min;
    }
}
```

- 用户定义的值类型：一个用户定义的值类型允许在一个基础的值类型上创建一个零成本的抽象。这类似一个别名，但有更严格的类型要求。
  用户定义值类型使用`type C is V`来定义，其中`C`是新引入的类型的名称，`V`必须是内置的值类型（‘底层类型’）。函数`C.wrap`被用来从底层类型转换到自定义类型。同样地，函数`C.unwrap`用于从自定义类型转换到底层类型。
  类型`C`没有任何的运算符或绑定成员。特别是，即使是操作符`==`也没有定义。也不允许与其他类型进行显示或隐式转换。
  自定义类型的值的数据表示则继承自底层类型，并且 ABI 中也使用底层类型。
  下面的例子说明了一个自定义类型`UFixed256x18`，代表了一个有 18 位小数的十进制定点类型，并有一个库来对该类型进行算术操作。

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

// Represent a 18 decimal, 256 bit wide fixed point type using a user defined value type.
type UFixed256x18 is uint256;

/// A minimal library to do fixed point operations on UFixed256x18.
library FixedMath {
    uint constant multiplier = 10**18;

    /// Adds two UFixed256x18 numbers. Reverts on overflow, relying on checked
    /// arithmetic on uint256.
    function add(UFixed256x18 a, UFixed256x18 b) internal pure returns (UFixed256x18) {
        return UFixed256x18.wrap(UFixed256x18.unwrap(a) + UFixed256x18.unwrap(b));
    }
    /// Multiplies UFixed256x18 and uint256. Reverts on overflow, relying on checked
    /// arithmetic on uint256.
    function mul(UFixed256x18 a, uint256 b) internal pure returns (UFixed256x18) {
        return UFixed256x18.wrap(UFixed256x18.unwrap(a) * b);
    }
    /// Take the floor of a UFixed256x18 number.
    /// @return the largest integer that does not exceed `a`.
    function floor(UFixed256x18 a) internal pure returns (uint256) {
        return UFixed256x18.unwrap(a) / multiplier;
    }
    /// Turns a uint256 into a UFixed256x18 of the same value.
    /// Reverts if the integer is too large.
    function toUFixed256x18(uint256 a) internal pure returns (UFixed256x18) {
        return UFixed256x18.wrap(a * multiplier);
    }
}

```

- 函数类型：函数类型是一种表示函数的类型。可以将一个函数赋值给另一个函数类型的变量，也可以将一个函数作为参数进行传递，还能在函数调用中返回函数类型。函数类型有两类：
  - 内部（internal）函数类型：内部函数类型只能在当前合约内被调用。
  - 外部（external）函数类型：外部函数是由一个地址和一个函数签名组成，可以通过外部函数调用传递或返回。
    函数类型表示成如下形式：
    `function (<parameter types>) {internal|external} [pure|constant|view|payable[returns (<return types>)]`
    与参数相反，返回类型不能为空——如果函数类型不需要返回值，则需要删除整个`returns (<return types>)`部分
    函数类型默认是内部函数，因此不需要声明`internal`关键字
    **注意：** 这仅适用于函数类型，合约中定义的函数明确指定可见性，它们是没有默认值的。
    类型转换：函数类型`A`可以隐式转换为函数类型`B`
    当且仅当： - 它们的参数类型相同 - 它们的返回值类型相同 - 它们的内部/外部属性相同 - 并且`A`的状态可变性比`B`的状态可变性更具限制性，比如： - `pure`函数可以转换为`view`和`non-payable`函数 - `view`函数可以转换为`non-payable`函数 - `payable`函数可以转换为`non-payable`函数
    关于 `payable` 和 `non-payable` 的规则可能有点令人困惑，但实质上，如果一个函数是 `payable` ，这意味着它 也接受零以太的支付，因此它也是 `non-payable` 。 另一方面，`non-payable` 函数将拒绝发送给它的 以太币 Ether ， 所以 `non-payable` 函数不能转换为 `payable` 函数。
    如果外部函数类型在 Solidity 的上下文环境以外的地方使用，它们会被视为`function`类型。该类型将函数地址紧跟其函数标识一起编码为一个`betys24`类型。
    **请注意**，当前合约的 public 函数既可以被当做内部函数也可以被当做外部函数使用。如果想将一个函数当做内部函数使用，就用`f`调用，如果想将其当做外部函数，使用`this.f`。
    一个内部函数可以被分配给一个内部函数类型的变量，无论定义在哪里，包括合约和库的私有，内部和 public 函数，以及自由函数。另一方面，外部函数类型只与 public 和外部合约函数兼容。库是不可以的，因为库使用`delegatecall`，并且它们的函数选择器有不同的 ABI 转换。接口声明的函数没有定义，所以指向它们也没有意义。
    成员：
    public（或 external）函数都有下面的成员
- `address`属性：返回函数的合约地址
- `selector`属性：返回 ABI 函数的选择器

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.4  <0.9.0;
//使用成员的例子
contract Example {
  function f() public payable returns (bytes4) {
    assert(this.f.address == address(this));
    return this.f.selector;
  }
  function g() public {
    this.f{gas: 10, value: 800}();
  }
}

//使用内部函数类型的例子
library ArrayUtils {
  // 内部函数可以在内部库函数中使用，
  // 因为它们会成为同一代码上下文的一部分
  function map(uint[] memory self, function (uint) pure returns (uint) f)
    internal
    pure
    returns (uint[] memory r)
  {
    r = new uint[](self.length);
    for (uint i = 0; i < self.length; i++) {
      r[i] = f(self[i]);
    }
  }
  function reduce(
    uint[] memory self,
    function (uint, uint) pure returns (uint) f
  )
    internal
    pure
    returns (uint r)
  {
    r = self[0];
    for (uint i = 1; i < self.length; i++) {
      r = f(r, self[i]);
    }
  }
  function range(uint length) internal pure returns (uint[] memory r) {
    r = new uint[](length);
    for (uint i = 0; i < r.length; i++) {
      r[i] = i;
    }
  }
}

contract Pyramid {
  using ArrayUtils for *;
  function pyramid(uint l) public pure returns (uint) {
    return ArrayUtils.range(l).map(square).reduce(sum);
  }
  function square(uint x) internal pure returns (uint) {
    return x * x;
  }
  function sum(uint x, uint y) internal pure returns (uint) {
    return x + y;
  }
}

//使用外部函数类型的例子
contract Oracle {
  struct Request {
    bytes data;
    function(uint) external callback;
  }
  Request[] private requests;
  event NewRequest(uint);
  function query(bytes memory data, function(uint) external callback) public {
    requests.push(Request(data, callback));
    emit NewRequest(requests.length - 1);
  }
  function reply(uint requestID, uint response) public {
    // 这里检查回复来自可信来源
    requests[requestID].callback(response);
  }
}

contract OracleUser {
  Oracle constant private ORACLE_CONST = Oracle(address(0x00000000219ab540356cBB839Cbe05303d7705Fa)); // known contract
  uint private exchangeRate;
  function buySomething() public {
    ORACLE_CONST.query("USD", this.oracleResponse);
  }
  function oracleResponse(uint response) public {
    require(
        msg.sender == address(ORACLE_CONST),
        "Only oracle can call this."
    );
    exchangeRate = response;
  }
}
```

### 引用类型

引用类型可以通过多个不同的名称修改它的值，而值的类型的变量，每次都有独立的副本。因此，必须比值类型更谨慎的处理引用类型。目前，引用类型包括结构，数组和映射，如果使用引用类型，则必须明确指明数据储存哪种类型的位置（空间）里：

- 内存（memory）即数据在内存中，因此数据仅在其生命周期内（函数调用期间）有效。不能用于外部调用。
- 储存（storage）状态变量保存的位置，只要合约存在就一直储存。
- 调用数据（calldata）用来保存函数参数的特殊数据位置，是一个只读位置。

更改数据位置或类型转换将始终产生自动进行一份拷贝，而在同一数据位置内（对于储存 storage 来说）的复制仅在某些情况下进行拷贝。

#### 数据位置

所有的引用类型，如数组和结构体类型，都有一个额外的注解`数据位置`，来说明数据储存位置。
有三种位置：内存（memory）、储存（storage）、以及调用数据（calldata）。调用数据（calldata）是不可修改的、非持久的函数参数储存区域，效果大多类似内存（memory）。主要用于外部函数的参数，但也可用于其他变量。
**数据位置与赋值行为**：数据位置不仅仅表示数据如何保存，它同样影响这赋值行为：

- 在储存（storage）和内存（memory）之间两两赋值（或者从调用数据（calldata）赋值），都会创建一份独立的拷贝。
- 从内存（memory）到内存（memory）的赋值只创建引用，这意味着更改内存变量，其他引用相同数据的所有其他内存变量的值也会跟着改变。
- 从储存（storage）到本地储存（storage）变量的赋值也只分配一个引用
- 其他的像储存（storage）的赋值，总是进行拷贝。这种情况的示例如下：对状态变量或储存（storage）的结构体类型的局部变量成员赋值，即使局部变量本身是一个引用，也会进行一份拷贝。

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Tiny {
    uint[] x; // x 的数据存储位置是 storage，　位置可以忽略

    // memoryArray 的数据存储位置是 memory
    function f(uint[] memory memoryArray) public {
        x = memoryArray; // 将整个数组拷贝到 storage 中，可行
        uint[] storage y = x;  // 分配一个指针（其中 y 的数据存储位置是 storage），可行
        y[7]; // 返回第 8 个元素，可行
        y.pop(); // 通过 y 修改 x，可行
        delete x; // 清除数组，同时修改 y，可行

        // 下面的就不可行了；需要在 storage 中创建新的未命名的临时数组，
        // 但 storage 是“静态”分配的：
        // y = memoryArray;
        // 下面这一行也不可行，因为这会“重置”指针，
        // 但并没有可以让它指向的合适的存储位置。
        // delete y;

        g(x); // 调用 g 函数，同时移交对 x 的引用
        h(x); // 调用 h 函数，同时在 memory 中创建一个独立的临时拷贝
    }

    function g(uint[] storage ) internal pure {}
    function h(uint[] memory) public pure {}
}
```

#### 数组

可以在声明时指定长度，也可以动态调整大小（长度）。

- 一个元素类型为`T`，固定长度为`K`的数组可以声明为`T[K]`，而动态数组声明为`T[]`。比如：一个长度为 5，元素类型为 uint 的动态数组的数组（二维数组），应声明为`uint[][5]`，注意这里跟其他语言比，数组长度的声明位置是反的
- 在 Solidity 中，`X[3]`总是一个包含三个`X`类型元素的数组，即使`X`本身是一个数组，这和其他语言也有所不同。
- 数组的下标是从 0 开始的，且访问数组时的下标顺序与声明相反。比如：如果有一个变量为`uint[][5] memory x`，要访问第三个动态数组的第 7 个元素，使用`x[2][6]`，要访问第三个动态数组使用`x[2]`。同样，如果有一个`T`类型的数组`T[5] a`，`T`也可以是一个数组，那么`a[2]`总会是`T`类型。
- 数组元素可以是任何类型，包括映射或结构体。对类型的限制是映射只能储存在储存（storage）中，并且公开访问函数的参数需要是 ABI 类型。
- 状态变量标记`public`的数组，Solidity 创建一个 getter 函数。小标数字索引就是 getter 函数的参数。
- 访问超出数组长度的元素会导致异常（assert 类型异常）。可以使用`push`方法在末尾追加一个新元素，其中`push`方法追加一个零初始化的元素并返回对它的引用。

##### `bytes`和`string`也是数组

`bytes`和`string`类型的变量是特殊类型的数组。`bytes`类似于`bytes1[]`，但它在调用数据（calldata）和内存（memory）中会被“紧打包”（将元素连续的存在一起，不会按每 32 字节一单位的方式来存放）。`string`和`bytes`相同，但不允许用长度或索引来访问。
Solidity 没有字符串操作函数，但是可以使用第三方库，我们可以比较两个字符串通过计算它们的 keccak256-hash，可使用`keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2)))` 和使用`string.concat(s1,s2)`来拼接字符串。
我们更多时候应该使用`bytes`而不是`bytes1[]`，因为 Gas 费用更低，在内存（memory）中使用`bytes1[]`时，会在元素之间添加 31 个填充字节。而在储存（storage）中，由于紧密包装，这没有填充字节。作为一个基本规则，对任意长度的原始字节数据使用`bytes`，对任意长度字符串数据使用`string`。
如果使用一个长度限制的字节数组，应该使用一个`bytes1`到`bytes32`的具体类型，因为它们便宜的多。

###### 函数`bytes.concat`和`string.concat`

可以使用`string.concat`连接任意数量的`string`字符串。该函数返回一个`string memory`，包含所有参数的内容，无填充方式拼接在一起。如果你想使用不能隐式转换为`string`的其他类型作为参数，你需要先把它们转换为`string`。
同样，`bytes.concat`函数可以连接任意数量的`bytes`或`bytes1`……`bytes32`值。该函数返回一个`betys memory`，包含所有参数的内容，无填充方式拼接在一起。如果你想使用字符串参数或者其他不能隐式转换为`bytes`的类型，你需要先将它们转换为`bytes`或`bytes1`……`bytes32`。
如果你调用不使用参数调用`string.concat`或`bytes.concat`将返回空数组。

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

contract C {
    string s = "Storage";
    function f(bytes calldata bc, string memory sm, bytes16 b) public view {
        string memory concatString = string.concat(s, string(bc), "Literal", sm);
        assert((bytes(s).length + bc.length + 7 + bytes(sm).length) == bytes(concatString).length);

        bytes memory concatBytes = bytes.concat(bytes(s), bc, bc[:2], "Literal", bytes(sm), b);
        assert((bytes(s).length + bc.length + 2 + 7 + bytes(sm).length + b.length) == concatBytes.length);
    }
}
```

###### 创建内存数组

可使用`new`关键字在内存（memory）中基于运行时创建动态长度数组。与储存（storage）数组相反的是，你不能通过`push`改变内存数组的大小
必须提前计算所需的大小或者创建一个新的内存数组并复制每个元素。
在 Solidity 中的所有变量，新分配的数组元素总是以默认值初始化。

```sol
pragma solidity >=0.4.16 <0.9.0;

contract TX {
    function f(uint len) public pure {
        uint[] memory a = new uint[](7);
        bytes memory b = new bytes(len);

        assert(a.length == 7);
        assert(b.length == len);

        a[6] = 8;
    }
}
```

###### 数组常量

数组常量（字面量）是在方括号（`[...]`）包含一个或多个逗号分隔的表达式。例如：`[1,a,f(3)]`。
数组常量的类型通过以下方式确定：

- 它总是一个静态大小的内存数组，其长度为表达式的数量。
- 数组的基本类型是列表上的第一个表达式类型，以便所有其他表达式可以隐式的转换为它。如果不可以转换，将出现错误。
- 所有元素都可以转换为基本类型也是不够的。其中一个元素必须是这种类型。
  在下面例子中，`[1,2,3]`的类型是`uint8[] memory`。因为每个常量的类型都是`uint8`，如果你希望结果是`uint[3] memory`类型，你需要将第一个元素转换为`uint`。

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract LBC {
    function f() public pure {
        g([uint(1), 2, 3]);
    }
    function g(uint[3] memory) public pure {
        // ...
    }
}
```

数组常量`[1,-1]`是无效的，因为第一个表达式类型是`uint8`而第二个表达式类型是`int8`，它们不可以隐式相互转换。为了确保可以运行，你可以使用例如：`[int(1),-1]`进行显式转换。

由于不同类型的固定大小的内存数组不能相互转换（尽管基础类型可以），如果你想使用二维数组常量，你必须显式的指定一个基础类型：

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract C {
    function f() public pure returns (uint24[2][4] memory) {
        uint24[2][4] memory x = [[uint24(0x1), 1], [0xffffff, 2], [uint24(0xff), 3], [uint24(0xffff), 4]];
        // 下面代码无法工作，因为没有匹配内部类型
        // uint[2][4] memory x = [[0x1, 1], [0xffffff, 2], [0xff, 3], [0xffff, 4]];
        return x;
    }
}
```

目前需要注意的是，定长的内存数组不能赋值给变长的内存数组，下面的例子是无法运行的：

```sol
pragma solidity  >=0.4.0 <0.9.0;

// 这段代码并不能编译。
contract LBC {
    function f() public {
        // 这一行引发了一个类型错误，因为 unint[3] memory
        // 不能转换成 uint[] memory。
        uint[] x = [uint(1), 3, 4];
    }
}
```

如果要初始化动态长度的数组，则必须显式给各个元素赋值：

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract C {
    function f() public pure {
        uint[] memory x = new uint[](3);
        x[0] = 1;
        x[1] = 3;
        x[2] = 4;
    }
}
```

###### 数组成员

- `length`属性：表示当前数组的长度。
- `push`方法：动态的储存（storage）数组以及`bytes`类型（`string`类型不可以）都有一个`push`方法，它用来添加新的零初始化元素到数组末尾，并返回元素引用。因此可以这样`x.push().t = 2`或`x.push() = b`
- `push(x)`方法：动态的储存（storage）数组以及`bytes`类型（`string`类型不可以）都有一个`push(x)`方法，用来在数组末尾添加一个给定的元素，这个函数没有返回值。
- `pop`方法：动态的储存（storage）数组以及`bytes`类型（`string`类型不可以）都有一个`pop`方法，它可以从数组末尾删除元素。同样的会在移除元素上隐含调用`delete`。
  注解：
- 通过`push`增加储存数组的长度具有固定的 gas 消耗，因为储存总是被零初始化，而通过`pop`减少长度则依赖移除与元素的大小（size）。如果元素是数组，则成本是很高的，因为它包括已删除的元素清理，类似于在这些元素上调用`delete`。
- 如果需要在外部（external）函数中使用多维数组，这需要启用 ABI coder v2。共有（public）函数中是支持使用多维数组的。

```sol
pragma solidity >=0.6.0 <0.9.0;

contract ArrayContract {
    uint[2**20] aLotOfIntegers;

    // 注意下面的代码并不是一对动态数组，
    // 而是一个数组元素为一对变量的动态数组（也就是数组元素为长度为 2 的定长数组的动态数组）。
    // 因为  T[] 总是 T 的动态数组, 尽管 T 是数组
    // 所有的状态变量的数据位置都是 storage
    bool[2][] pairsOfFlags;

    // newPairs 存储在 memory 中 (仅当它是公有的合约函数)
    function setAllFlagPairs(bool[2][] memory newPairs) public {

     // 向一个 storage 的数组赋值会对 ``newPairs`` 进行拷贝，并替代整个 ``pairsOfFlags`` 数组
        pairsOfFlags = newPairs;
    }

    struct StructType {
        uint[] contents;
        uint moreInfo;
    }
    StructType s;

    function f(uint[] memory c) public {
        // 保存引用
        StructType storage g = s;

        // 同样改变了 ``s.moreInfo``.
        g.moreInfo = 2;

        // 进行了拷贝，因为 ``g.contents`` 不是本地变量，而是本地变量的成员
        g.contents = c;
    }

    function setFlagPair(uint index, bool flagA, bool flagB) public {
        // 访问不存在的索引将引发异常
        pairsOfFlags[index][0] = flagA;
        pairsOfFlags[index][1] = flagB;
    }

    function changeFlagArraySize(uint newSize) public {
       // 使用 push 和 pop 是更改数组长度的唯一方法

        if (newSize < pairsOfFlags.length) {
            while (pairsOfFlags.length > newSize)
                pairsOfFlags.pop();
        } else if (newSize > pairsOfFlags.length) {
            while (pairsOfFlags.length < newSize)
                pairsOfFlags.push();
        }
    }

    function clear() public {
        // 这些完全清除了数组
        delete pairsOfFlags;
        delete aLotOfIntegers;
        // 效果相同（和上面）
        pairsOfFlags.length = new bool[2][](0);
    }

    bytes byteData;

    function byteArrays(bytes memory data) public {
        // 字节数组（bytes）不一样，它们在没有填充的情况下存储。
        // 可以被视为与 uint8 [] 相同
        byteData = data;
        for (uint i = 0; i < 7; i++)
            byteData.push();
        byteData[3] = 0x08;
        delete byteData[2];
    }

    function addFlag(bool[2] memory flag) public returns (uint) {
        pairsOfFlags.push(flag);
        return pairsOfFlags.length;
    }

    function createMemoryArray(uint size) public pure returns (bytes memory) {
        // 使用`new`创建动态内存数组：
        uint[2][] memory arrayOfPairs = new uint[2][](size);

        // 内联（Inline）数组始终是静态大小的，如果只使用字面常量，则必须至少提供一种类型。
        arrayOfPairs[0] = [uint(1), 2];

        // 创建一个动态字节数组：
        bytes memory b = new bytes(200);
        for (uint i = 0; i < b.length; i++)
            b[i] = byte(uint8(i));
        return b;
    }
}
```

#### 数组切片

数组切片是数组连续部分的视图，用法如：`x[start:end]`，`start`和`end`是 uint256 类型（或结果为 uint256 的表达式）。`x[start:end]`的第一个元素是`x[start]`，最后一个元素是`x[end-1]`。
如果`start`比`end`大或者`end`比数组长度还长，将会抛出异常。
`start`和`end`都是可选的：`start`默认是 0，而`end`默认是数组长度。
数组切片没有任何成员。它们可以隐式转换为其“背后”类型的数组，并支持索引访问。索引访问也是相对于切片的开始位置。数组切片没有类型名称，这意味着没有变量可以将数组切片作为类型，它们仅存在于中间表达式中。
目前数组切片，仅可使用于 calldata 数组。
数组切片在 ABI 解码数据的时候非常有用，比如：

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.5 <0.9.0;

contract Proxy {
    /// 被当前合约管理的 客户端合约地址
    address client;

    constructor(address client_) {
        client = client_;
    }

    /// 在进行参数验证之后，转发到由client实现的 "setOwner(address)"
    function forward(bytes calldata payload) external {
        bytes4 sig = bytes4(payload[:4]);

        // 由于截断行为，与执行 bytes4(payload) 是相同的
        // bytes4 sig = bytes4(payload);

        if (sig == bytes4(keccak256("setOwner(address)"))) {
            address owner = abi.decode(payload[4:], (address));
            require(owner != address(0), "Address of owner cannot be zero.");
        }
        (bool status,) = client.delegatecall(payload);
        require(status, "Forwarded call failed.");
    }
}
```

#### 结构体

Solidity 支持通过结构构造体的形式定义新的类型，以下是一个结构体使用的示例：

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

// 定义的新类型包含两个属性。
// 在合约外部声明结构体可以使其被多个合约共享。 在这里，这并不是真正需要的。
struct Funder {
    address addr;
    uint amount;
}

contract CrowdFunding {

    // 也可以在合约内部定义结构体，这使得它们仅在此合约和衍生合约中可见。
    struct Campaign {
        address beneficiary;
        uint fundingGoal;
        uint numFunders;
        uint amount;
        mapping (uint => Funder) funders;
    }

    uint numCampaigns;
    mapping (uint => Campaign) campaigns;

    function newCampaign(address payable beneficiary, uint goal) public returns (uint campaignID) {
        campaignID = numCampaigns++; // campaignID 作为一个变量返回

        // 不能使用 "campaigns[campaignID] = Campaign(beneficiary, goal, 0, 0)"
        // 因为RHS（right hand side）会创建一个包含映射的内存结构体 "Campaign"
        Campaign storage c = campaigns[campaignID];
        c.beneficiary = beneficiary;
        c.fundingGoal = goal;
    }

    function contribute(uint campaignID) public payable {
        Campaign storage c = campaigns[campaignID];
        // 以给定的值初始化，创建一个新的临时 memory 结构体，
        // 并将其拷贝到 storage 中。
        // 注意你也可以使用 Funder(msg.sender, msg.value) 来初始化。
        c.funders[c.numFunders++] = Funder({addr: msg.sender, amount: msg.value});
        c.amount += msg.value;
    }

    function checkGoalReached(uint campaignID) public returns (bool reached) {
        Campaign storage c = campaigns[campaignID];
        if (c.amount < c.fundingGoal)
            return false;
        uint amount = c.amount;
        c.amount = 0;
        c.beneficiary.transfer(amount);
        return true;
    }
}
```

注意在函数中使用结构体时，一个结构体是如何赋值给一个储存位置是储存（storage）的局部变量。在这个过程中并没有拷贝这个结构体，而是保存一个引用，所以对局部变量成员的赋值实际上会被写入状态。
当然，你也可以直接访问结构体的成员而不用将其赋值给一个局部变量，就像这样，`campaigns[campaignID].amount = 0`

### 映射

映射类型在声明时的形式为`mapping(KeyType => ValueType)`。其中`KeyType`可以是任何基本类型，即可以是任何的内建类型，`bytes`和`string`或合约类型、枚举类型。而其他用户定义的类型或复杂的类型如：映射、结构体、即除`bytes`和`string`之外的数组类型是不可以作为`keyType`的类型的。

`ValueType`可以是包括映射类型在内的类型。

映射可以视作哈希表，它们在实际的初始化过程中创建每个可能的 key，并将其映射到字节形式全是零的值：一个类型的默认值。然而下面是映射与哈希表不同的地方：在映射中，实际并不存储 key，而是存储它的`keccak256`哈希值，从而便于查询实际的值。
正因如此，映射是没有长度，也没有 key 的集合或 value 的集合的概念。因此如果没有其他信息键的信息是无法被删除的。
映射只能是**存储（storage）的数据位置**，因此只允许作为状态变量或作为函数内的存储（storage）引用或作为库函数的参数。它们不能用合约公有函数的参数或返回值。
这些限制同样适用于包含映射的数组和结构体。
可以将映射声明为`public`，然后来让 Solidity 创建一个 getter 函数。KeyType 将成为 getter 的必须参数，并且 getter 会返回 ValueType。
如果 ValueType 是一个映射。这时再使用 getter 时将需要递归的传入每个 KeyType 参数。

在下面的示例中，　 MappingExample 　合约定义了一个公共　 balances 　映射，键类型为 address，值类型为 uint， 将以太坊地址映射为 无符号整数值。 由于　 uint 　是值类型，因此 getter 返回与该类型匹配的值， 可以在　 MappingLBC 　合约中看到合约在指定地址返回该值。

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract MappingExample {
    mapping(address => uint) public balances;

    function update(uint newBalance) public {
        balances[msg.sender] = newBalance;
    }
}

contract MappingLBC {
    function f() public returns (uint) {
        MappingExample m = new MappingExample();
        m.update(100);
        return m.balances(this);
    }
}
```

#### 可迭代映射

映射本身是无法遍历的，即无法枚举所有的键。不过，可以在它们之上实现一个数据结构来进行迭代。
例如以下代码：实现了 IterableMapping 库，然后　 User 合约可以添加数据，　 sum 　函数迭代求和所有值。

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

struct IndexValue { uint keyIndex; uint value; }
struct KeyFlag { uint key; bool deleted; }

struct itmap {
    mapping(uint => IndexValue) data;
    KeyFlag[] keys;
    uint size;
}

type Iterator is uint;

library IterableMapping {
    function insert(itmap storage self, uint key, uint value) internal returns (bool replaced) {
        uint keyIndex = self.data[key].keyIndex;
        self.data[key].value = value;
        if (keyIndex > 0)
            return true;
        else {
            keyIndex = self.keys.length;

            self.keys.push();
            self.data[key].keyIndex = keyIndex + 1;
            self.keys[keyIndex].key = key;
            self.size++;
            return false;
        }
    }

    function remove(itmap storage self, uint key) internal returns (bool success) {
        uint keyIndex = self.data[key].keyIndex;
        if (keyIndex == 0)
            return false;
        delete self.data[key];
        self.keys[keyIndex - 1].deleted = true;
        self.size --;
    }

    function contains(itmap storage self, uint key) internal view returns (bool) {
        return self.data[key].keyIndex > 0;
    }

    function iterateStart(itmap storage self) internal view returns (Iterator) {
        return iteratorSkipDeleted(self, 0);
    }

    function iterateValid(itmap storage self, Iterator iterator) internal view returns (bool) {
        return Iterator.unwrap(iterator) < self.keys.length;
    }

    function iterateNext(itmap storage self, Iterator iterator) internal view returns (Iterator) {
        return iteratorSkipDeleted(self, Iterator.unwrap(iterator) + 1);
    }

    function iterateGet(itmap storage self, Iterator iterator) internal view returns (uint key, uint value) {
        uint keyIndex = Iterator.unwrap(iterator);
        key = self.keys[keyIndex].key;
        value = self.data[key].value;
    }

    function iteratorSkipDeleted(itmap storage self, uint keyIndex) private view returns (Iterator) {
        while (keyIndex < self.keys.length && self.keys[keyIndex].deleted)
            keyIndex++;
        return Iterator.wrap(keyIndex);
    }
}

// 如何使用
contract User {
    // Just a struct holding our data.
    itmap data;
    // Apply library functions to the data type.
    using IterableMapping for itmap;

    // Insert something
    function insert(uint k, uint v) public returns (uint size) {
        // This calls IterableMapping.insert(data, k, v)
        data.insert(k, v);
        // We can still access members of the struct,
        // but we should take care not to mess with them.
        return data.size;
    }

    // Computes the sum of all stored data.
    function sum() public view returns (uint s) {
        for (
            Iterator i = data.iterateStart();
            data.iterateValid(i);
            i = data.iterateNext(i)
        ) {
            (, uint value) = data.iterateGet(i);
            s += value;
        }
    }
}
```

### 操作符

即使两个操作数的类型不一样，也可以进行算术和位操作运算。 例如，你可以计算`y = x + z` ，其中`x` 是 `uint8` ， `z` 是 `int32` 类型。 在这些情况下，将使用以下机制来确定运算结果的类型（这在溢出的情况下很重要）。

1. 如果右操作数的类型可以隐含地转换为左操作数的类型的类型，则使用左操作数的类型。
2. 如果左操作数的类型可以隐含地转换为右操作数的类型的类型，则使用右操作数的类型。
3. 否则，该操作不被允许。
   如果其中一个操作数是一个 常量数字，会首先被转换为能容纳该值的最小的类型 (相同位数时，无符号类型被认为比有符号类型 “小”)。 如果两者都是常量数字，则以任意的精度进行计算。
   操作符的结果类型与执行操作的类型相同，除了比较运算符，其结果总是 `bool`。
   运算符 `**（幂）`， `<<` 和 `>>` 使用左边操作数的类型来作为运算结果类型。

#### 三元运算符

三元运算符是一个表达是形式： `<expression> ? <trueExpression> : <falseExpression>` 。 它根据 `<expression>` 的执行结果，选择后两个给定表达式中的一个。 如果 `<expression>` 执行结果 true ，那么 `<trueExpression>` 将被执行，否则 `<falseExpression>` 被执行。

三元运算符的结果不会为有理数类型，即使它的所有操作数都是有理数类型。 结果类型是由两个操作数的类型决定的，方法与上面一样，如果需要的话，首先转换为它们的最小可容纳类型（mobile type ）。

因此， `255 + (true ? 1 : 0)` 将由于算术溢出而被回退。 原因是 `(true ? 1 : 0)` 是 `uint8` 类型，这迫使加法也要在 `uint8` 中执行。 而 256 超出了这个类型所允许的范围。

另一个结果是，像 `1.5 + 1.5` 这样的表达式是有效的，但 `1.5 + (true ? 1.5 : 2.5)` 则无效。 这是因为前者是以无限精度来进行有理表达式运算，只有它的最终结果值才是重要的。 后者涉及到将小数有理数转换为整数，这在目前是不允许的。

#### 复合操作及自增自减操作

如果 a 是一个 LValue（即一个变量或者其它可以被赋值的东西），以下运算符都可以使用简写：
a += e 等同于 a = a + e。其它运算符如 -=， \*=， /=， %=， |=， &= ， ^= ， <<= 和 >>= 都是如此定义的。 a++ 和 a-- 分别等同于 a += 1 和 a -= 1，但表达式本身的值等于 a 在计算之前的值。 与之相反， --a 和 ++a 虽然最终 a 的结果与之前的表达式相同，但表达式的返回值是计算之后的值。

#### delete

`delete a` 的结果是将 a 类型初始值赋值给 a。即对于整型变量来说，相当于 `a = 0`，`delete` 也适用于数组，对于动态数组来说，是将重置为数组长度为 0 的数组，而对于静态数组来说，是将数组中的所有元素重置为初始值。对数组而言， `delete a[x]` 仅删除数组索引 x 处的元素，其他的元素和长度不变，这以为着数组中留出了一个空位。如果打算删除项，映射可能是更好的选择。

如果对象 `a` 是结构体，则将结构体中的所有属性(成员)重置。

换句话说，在 `delete a` 之后 a 的值与在没有赋值的情况下声明 a 的情况相同， 但需要注意以下几点：

- `delete` 对整个映射是无效的（因为映射的键可以是任意的，通常也是未知的）。 因此在你删除一个结构体时，结果将重置所有的非映射属性（成员），这个过程是递归进行的，除非它们是映射。 然而，单个的键及其映射的值是可以被删除的。

理解 `delete a` 的效果就像是给 a 赋值很重要，换句话说，这相当于在 a 中存储了一个新的对象。

当 a 是应用变量时，我们可以看到这个区别， `delete a` 它只会重置 a 本身，而不是更改它之前引用的值。

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract DeleteLBC {
    uint data;
    uint[] dataArray;

    function f() public {
        uint x = data;
        delete x; // 将 x 设为 0，并不影响数据
        delete data; // 将 data 设为 0，并不影响 x，因为它仍然有个副本
        uint[] storage y = dataArray;
        delete dataArray;
        // 将 dataArray.length 设为 0，但由于 uint[] 是一个复杂的对象，y 也将受到影响，
        // 因为它是一个存储位置是 storage 的对象的别名。
        // 另一方面："delete y" 是非法的，引用了 storage 对象的局部变量只能由已有的 storage 对象赋值。
        assert(y.length == 0);
    }
}
```

### 基本类型之间的转换

#### 隐式转换
在某些情况下，编译器会自动进行隐式类型转换， 这些情况包括: 在赋值, 参数传递给函数以及应用运算符时。 通常，如果可以进行值类型之间的隐式转换， 并且不会丢失任何信息。 都是可以隐式类型转换
例如, `uint8` 可以转换成 `uint16`， `int128` 转换成 `int256`，但 `int8` 不能转换成 `uint256` （因为 `uint256` 不能涵盖某些值，例如， -1）。
如果将运算符应用于不同的类型，则编译器将尝试将其中一个操作数隐式转换为另一个操作数的类型（赋值也是如此）。 这意味着操作始终以操作数之一的类型执行。

#### 显示转换


## 单位和全局变量

### 以太币（Ether）单位

### 时间单位

### 特殊变量和函数

## 表达式和控制结构

### 控制结构

### 函数调用

### 通过 new 创建合约

### 表达式计算顺序

### 赋值

### 作用域和声明

### 算术运算的检查模式与非检查模式

### 错误处理及异常：Assert,Require,Revert

## 合约

### 创建合约

### 可见性和 getter 函数

### 函数修改器（modifier）

### Constant 和 Immutable 状态变量

### 函数

### 事件 Events

### 错误和回退语句

### 继承

### 抽象合约

### 接口

### 库

### Using For

## 内联汇编

## [速查表](https://learnblockchain.cn/docs/solidity/cheatsheet.html#order)

## 语言语法

# 编译器

## 使用编译器

## Analysing the Compiler Output

## Solidity IR-based Codegen Changes

# 深入 SOLIDITY 内部

## 状态变量在储存中布局

### 映射和动态数组

### JSON 输出

## 变量在内存布局

### 与储存中布局的不同

## Call Data 布局

## 清理变量

## Source Mappings

## The Optimizer

### Benefits of Optimizing Solidity Code

### Differences between Optimized and Non-Optimized Code

### Optimizer Parameter Runs

### Opcode-Based Optimizer Module

### Yul-Based Optimizer Module

## 合约的元数据

## 应用二进制接口说明

# 补充材料

## 重大更新

## NatSpec（注释描述）规范

## 安全考量

## SMTChecker 和形式化验证

## 资源

## Import Path Resolution

## Yul

## 编程风格指南

## 通用模式

## 已知 bug 列表

<https://learnblockchain.cn/docs/solidity/bugs.html>

# 相关文档

## [Hardhat 中文文档](https://learnblockchain.cn/docs/hardhat/getting-started/)

## [Ether.js 中文文档](https://learnblockchain.cn/docs/ethers.js/)

## [Web3.js 中文文档](https://learnblockchain.cn/docs/web3.js/)

## [Truffle 中文文档](https://learnblockchain.cn/docs/truffle/)
