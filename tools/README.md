# 功能

配置文件结构

```
页面
  类名
  表单
    描述
    表单项（描述，控件类型，布局（网格））
    提交
```

# yaml schema 示例

```yml
page:
  clsname: 'Page1'
  form:
    title: 用户信息
    items:
      - { type: "input", name: "username", required: true, col: 8 }
      - { type: "password", name: "password", required: true, col: 8 }
      - {
          type: "checkbox",
          name: "likes",
          required: true,
          col: 8,
          items: [{ lable:'羽毛球', value: 1 }, { lable:'乒乓球', value: 2 }],
        }
      - {
          type: "radio",
          name: "sex",
          required: true,
          col: 8,
          items: [{ lable:'男', value: 0 }, { lable:'女', value: 1 }],
        }
      - {
          type: "select",
          name: "sex",
          required: true,
          col: 8,
          items:
            [
              { lable:'Lucy', value: "Lucy" },
              { lable:'Jack', value: "Jack" },
              { lable:'Jack2', value: "Jack2" },
            ],
        }
    submit:
      btns:
        - { type: "submit", label: "submit", action: "/action.do" }
        - { type: "reset", label: "reset" }

```


```json
{
	"page": {
		"clsname": "Page1",
		"form": {
			"title": "用户信息",
			"items": [
				{
					"type": "input",
					"name": "username",
					"required": true,
					"col": 8
				},
				{
					"type": "password",
					"name": "password",
					"required": true,
					"col": 8
				},
				{
					"type": "checkbox",
					"name": "likes",
					"required": true,
					"col": 8,
					"items": [
						{
							"lable": "羽毛球",
							"value": 1
						},
						{
							"lable": "乒乓球",
							"value": 2
						}
					]
				},
				{
					"type": "radio",
					"name": "sex",
					"required": true,
					"col": 8,
					"items": [
						{
							"lable": "男",
							"value": 0
						},
						{
							"lable": "女",
							"value": 1
						}
					]
				},
				{
					"type": "select",
					"name": "sex",
					"required": true,
					"col": 8,
					"items": [
						{
							"lable": "Lucy",
							"value": "Lucy"
						},
						{
							"lable": "Jack",
							"value": "Jack"
						},
						{
							"lable": "Jack2",
							"value": "Jack2"
						}
					]
				}
			],
			"submit": {
				"btns": [
					{
						"type": "submit",
						"label": "submit",
						"action": "/action.do"
					},
					{
						"type": "reset",
						"label": "reset"
					}
				]
			}
		}
	}
}
```