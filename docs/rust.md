### Vectors

向量，rust 中数组分为定长 arrays 和不定长 vectors，不定长数组每一项类型相同，若初始化为后未赋值会报错，同时其容量会线性扩容，每次增加 4 个字节，故若知道数组长度，可在定义时传入数组长度，以提高运行效率。

### Tuples

元组，以( )表示，内部可以是各种类型的各种数量的变量，访问元组中某索引位置的值使用的是. 操作，且元组可用于数值解构，当遇到需要的变量使用\_代替即可。

### Control Flow

1. if 不用加括号（）

2. match 的写法（等同于 switch)

   ```rust
   //match用于判断
   fn main() {
       let my_number: u8 = 5;
       match my_number {
           0 => println!("it's zero"),
           1 => println!("it's one"),
           2 => println!("it's two"),
           _ => println!("It's some other number"),
       }
   }
   //match用于赋值
   fn main() {
       let my_number = 5;
       let second_number = match my_number {
           0 => 0,
           5 => 10,
           _ => 2,
       };
   }
   //match与if相结合
   fn main() {
       let sky = "cloudy";
       let temperature = "warm";

       match (sky, temperature) {
           ("cloudy", "cold") => println!("It's dark and unpleasant today"),
           ("clear", "warm") => println!("It's a nice day"),
           ("cloudy", "warm") => println!("It's dark but not bad"),
           _ => println!("Not sure what the weather is."),
       }
   }

   ```
