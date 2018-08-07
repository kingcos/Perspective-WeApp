# Perspective-WeApp

A WeApp of my personal blog - Perspective.

## WeApp Code

<img src="img/weapp_code.jpg" width="215">

## API List

> GitHub GraphQL API v4

- All labels

```graphql
# {"repo_owner": "kingcos", "repo_name": "Perspective", "label_count": 5  }
query Labels ($repo_owner: String!, $repo_name: String!, $label_count: Int!) {
    repository(owner: $repo_owner, name: $repo_name) {
        labels(first: $label_count) {
            nodes {
                name
            }
        }
    }
}
```

```json
{
  "data": {
    "repository": {
      "labels": {
        "nodes": [
          {
            "name": "[Focus]"
          }
        ]
      }
    }
  }
}
```

- Issues by label

```graphql
# {"repo_owner": "kingcos", "repo_name": "Perspective", "label_name": "[Tips]" }
query Issues ($repo_owner: String!, $repo_name: String!, $label_name: [String!]) {
    repository(owner: $repo_owner, name: $repo_name) {
        issues(first: 1, states: OPEN, labels: $label_name) {
            nodes {
                number
                title
                createdAt
                body
                comments {
                    totalCount
                }
            }
        }
    }
}
```

```json
{
  "data": {
    "repository": {
      "issues": {
        "nodes": [
          {
            "number": "7",
            "title": "简单管理多版本 JDK",
            "createdAt": "2018-05-05T17:21:34Z",
            "body": "CONTENT",
            "comments": {
              "totalCount": 0
            }
          }
        ]
      }
    }
  }
}
```

- Issue details & comments by issue number

```graphql
# { "repo_owner": "kingcos", "repo_name": "Perspective", "issue_num": 5 }
query Issue ($repo_owner: String!, $repo_name: String!, $issue_num: Int!) {
    repository(owner: $repo_owner, name: $repo_name) {
        issue(number: $issue_num) {
            title
            createdAt
            labels(first: 1) {
                nodes {
                    name
                }
            }
            body
            comments(first: 10) {
                nodes {
                    author {
                    login
                    avatarUrl
                    }
                body
                }
            }
        }
    }
}
```

```json
{
  "data": {
    "repository": {
      "issue": {
        "title": "Swift 中的 @autoclosure",
        "createdAt": "2018-05-05T17:07:37Z",
        "labels": {
          "nodes": [
            {
              "name": "[Focus]"
            }
          ]
        },
        "body": "CONTENT",
        "comments": {
          "nodes": [
            {
              "author": {
                "login": "gnijuohz",
                "avatarUrl": "https://avatars1.githubusercontent.com/u/1411204?v=4"
              },
              "body": "用JavaScript多了，看Swift的Closure看得费解地吃力，因为JavaScript里也有一个叫Closure的东西，两者虽叫同样的名字，却太不一样。\r\n\r\n我来借地盘稍稍比较一下：\r\n\r\nSwift中闭包就是一段可以以后call的代码，和其它语言里的匿名函数很像，然后@ escaping和@ nonescaping就是指明一个**传进来**的闭包是在调用函数返回后还是返回前执行。如果是返回后才会调用的话，调用函数的变量什么的不能被清了。\r\n\r\nJavaScript的[闭包](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)的话就是一个function和它的所谓lexical environment。\r\n\r\n差别不要太大 🤷‍♂️\r\n\r\n"
            },
            {
              "author": {
                "login": "kingcos",
                "avatarUrl": "https://avatars2.githubusercontent.com/u/10249989?v=4"
              },
              "body": "@gnijuohz 感谢您的评论～\r\n\r\n您说的很对～两门语言的一些语法确实有些类似，但 JS 作为脚本语言，灵活性非常强，又是弱类型，而 Swift 作为强调类型安全的编译语言，确实差别很大。"
            },
            {
              "author": {
                "login": "gnijuohz",
                "avatarUrl": "https://avatars1.githubusercontent.com/u/1411204?v=4"
              },
              "body": "@kingcos 恩，我再读了下苹果的[Closure文档](https://docs.swift.org/swift-book/LanguageGuide/Closures.html)，发现我之前的理解还是有误，苹果的文档这么说的，\r\n\r\n> Closures can capture and store references to any constants and variables from the context in which they are defined.\r\n\r\n然后，\r\n\r\n> Global and nested functions, as introduced in Functions, are actually special cases of closures. Closures take one of three forms:\r\n\r\n> Global functions are closures that have a name and do not capture any values.\r\n\r\n> Nested functions are closures that have a name and can capture values from their enclosing function.\r\n\r\n> Closure expressions are unnamed closures written in a lightweight syntax that can capture values from their surrounding context.\r\n\r\n这样看来，其实两者几乎就是一样的。"
            },
            {
              "author": {
                "login": "kingcos",
                "avatarUrl": "https://avatars2.githubusercontent.com/u/10249989?v=4"
              },
              "body": "@gnijuohz 嗯嗯，不过其实我个人确实一直没有怎么去深入或者比较多得使用过 JS 这门语言😂。"
            },
            {
              "author": {
                "login": "gnijuohz",
                "avatarUrl": "https://avatars1.githubusercontent.com/u/1411204?v=4"
              },
              "body": "@kingcos 我也是工作之后才深入研究js的哈哈。借你地方总结不好意思了 😅"
            },
            {
              "author": {
                "login": "kingcos",
                "avatarUrl": "https://avatars2.githubusercontent.com/u/10249989?v=4"
              },
              "body": "@gnijuohz 没事儿～欢迎交流哈😀"
            }
          ]
        }
      }
    }
  }
}
```

- Search by Issues

```graphql
# { "keyword": "autoclosure repo:kingcos/Perspective state:open" }
query Search ($keyword: String!) {
    search(first: 10, query: $keyword, type: ISSUE) {
        edges {
            node {
                ... on Issue {
                    number
                    title
                    createdAt
                    body
                    comments {
                        totalCount
                    }
                }
            }
        }
    }
}
```

```json
{
  "data": {
    "search": {
      "edges": [
        {
          "node": {
            "number": 5,
            "title": "Swift 中的 @autoclosure",
            "createdAt": "2018-05-05T17:07:37Z",
            "body": "CONTENT",
            "comments": {
              "totalCount": 6
            }
          }
        }
      ]
    }
  }
}
```

## LICENSE

- MIT
