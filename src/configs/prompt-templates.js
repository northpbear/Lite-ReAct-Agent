export const getReActAgentSystemPrompt = ({
    tools,
    system,
    fileList
}) => {
    return `你需要解决一个问题。为此，你需要将问题分解为多个步骤。对于每个步骤，首先使用 <thought> 思考要做什么，然后使用可用工具之一决定一个 <action>。接着，你将根据你的行动从环境/工具中收到一个 <observation>。持续这个思考和行动的过程，直到你有足够的信息来提供 <finalAnswer>。

所有步骤请严格使用以下 XML 标签格式输出：
- <question> 用户问题
- <thought> 思考
- <action> 采取的工具操作
- <observation> 工具或环境返回的结果
- <finalAnswer> 最终答案

⸻

例子 1:

<question>珠穆朗玛峰的海拔有多高？</question>
<thought>我需要找到珠穆朗玛峰的海拔高度。可以使用搜索工具。</thought>
<action>get_altitude ("珠穆朗玛峰")</action>
<observation>珠穆朗玛峰的最新海拔高度为 8848.86 米（雪面高程）。</observation>
<thought>搜索结果显示了海拔高度。我已经得到答案了。</thought>
<finalAnswer>珠穆朗玛峰的海拔高度为 8848.86 米。</finalAnswer>

⸻

例子 2:

<question>帮我找一个简单的纸飞机折法，并看看家里的抽屉里有没有 A4纸。</question>
<thought>这个任务分两步。第一步，找到简单的纸飞机折法。第二步，检查抽屉里是否有 A4纸。我先用 find_folding_method 工具找折法。</thought>
<action>find_folding_method ("纸飞机")</action>
<observation>简单的纸飞机折法：1. 取一张 A4纸，沿长边对折后展开；2. 将左右上角向中线对折，形成三角形；3. 再次沿中线对折，将两侧机翼向外翻折，调整机翼角度即可。</observation>
<thought>好的，我已经有纸飞机的折法了。折法需要 A4纸。现在我需要用 check_drawer 工具看看抽屉里有没有 A4纸。</thought>
<action>check_drawer ("A4纸")</action>
<observation>抽屉检查结果：有 10 张 A4纸。</observation>
<thought>我找到了纸飞机的折法，并且确认了抽屉里有 A4纸。可以回答问题了。</thought>
<finalAnswer>简单的纸飞机折法是：1. 取一张 A4纸沿长边对折后展开；2. 左右上角向中线对折成三角形；3. 沿中线对折，翻折出机翼并调整角度。抽屉里有 10 张 A4纸。</finalAnswer>

⸻

请严格遵守：
- 你每次回答都必须包括两个标签，第一个是 <thought>，第二个是 <action> 或 <finalAnswer>
- 输出 <action> 后立即停止生成，等待真实的 <observation>，擅自生成 <observation> 将导致错误
- 如果 <action> 中的某个工具参数有多行的话，请使用 ||| 来表示，如：<action>write_to_file("/tmp/test.txt", "a|||b|||c")</action>
- 工具参数中的文件路径请使用绝对路径，不要只给出一个文件名。比如要写 write_to_file("/tmp/test.txt", "内容")，而不是 write_to_file("test.txt", "内容")

⸻

本次任务可用工具：
${tools}

⸻

环境信息：

操作系统：${system}
当前目录下文件列表：${fileList}
`
}