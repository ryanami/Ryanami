/*
 * @Author: kasuie
 * @Date: 2024-05-07 13:51:39
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-13 19:51:50
 * @Description:
 */

export const analyzeLog = (content: Array<any>) => {
  const ipRequest: any = []
  // 存储 IP 地址和请求计数的映射
  const ipRequestCount: any = {}

  let logs = ''

  // 遍历日志行数组
  content.forEach((log) => {
    const lines = log.split('\n')
    lines.forEach((logLine: any) => {
      const fields = logLine.split(' ')
      const ip = fields[0]
      const request = fields[6]
      // 检测 DDOS 攻击
      if (!ipRequestCount[ip]) {
        ipRequestCount[ip] = 1
      } else {
        ipRequestCount[ip]++
        if (ipRequestCount[ip] >= 100) {
          logs = logs + logLine + '\n'
          ipRequest.push({
            ip,
            type: 1,
            desc: `可能是来自${ip}的DDOS攻击`,
            content: logLine
          })
        }
      }
      // 检测端口扫描
      if (logLine.startsWith('\\x') || logLine.includes('scan')) {
        ipRequest.push({
          ip,
          type: 2,
          desc: `可能是来自${ip}的端口扫描`,
          content: logLine
        })
        logs = logs + logLine + '\n'
      }

      // 检测 Webshell 攻击
      if (
        logLine.includes('eval') ||
        logLine.includes('assert') ||
        logLine.includes('eVAL') ||
        logLine.includes('$post\\=Decrypt(file\\_get\\_contents(“php://input”));')
      ) {
        ipRequest.push({
          ip,
          type: 3,
          desc: `可能是来自${ip}的Webshell攻击`,
          content: logLine
        })
        logs = logs + logLine + '\n'
      }

      //检测蚁剑
      if (
        (logLine.includes('antSword/*') && logLine.includes('@set_time_limit(0);')) ||
        logLine.includes('@ini_set(“display_errors”, “0”);')
      ) {
        ipRequest.push({
          ip,
          type: 4,
          desc: `可能是来自${ip}的蚁剑payload`,
          content: logLine
        })
        logs = logs + logLine + '\n'
      }

      //检测菜刀
      if (
        logLine.includes(
          'QGluaV9zZXQoImRpc3BsYXlfZXJyb3JzIiwiMCIpO0BzZXRfdGltZV9saW1pdCgwKTtpZihQSFBfVkVSU0lPTjwnNS4zLjAnKXtAc2V0X21hZ2ljX3F1b3Rlc19ydW50aW1lKDApO307ZWNobygiWEBZIik7J'
        )
      ) {
        ipRequest.push({
          ip,
          type: 4,
          desc: `可能是来自${ip}的蚁剑payload`,
          content: logLine
        })
        logs = logs + logLine + '\n'
      }

      //检测冰蝎
      if (
        (logLine.includes('Content-type: Application/x-www-form-urlencoded') &&
          logLine.includes('Accept: application/json, text/javascript, /; q=0.01')) ||
        logLine.includes('Accept: text/html,image/gif, image/jpeg, *; q=.2, /; q=.2')
      ) {
        ipRequest.push({
          ip,
          type: 5,
          desc: `可能是来自${ip}的冰蝎payload`,
          content: logLine
        })
        logs = logs + logLine + '\n'
      }

      //检测SQL注入
      if (
        request &&
        (request.includes('SELECT') ||
          request.includes('UNION') ||
          request.includes('DROP') ||
          request.includes('INSERT INTO'))
      ) {
        ipRequest.push({
          ip,
          type: 6,
          desc: `可能是来自${ip}的SQL 注入攻击`,
          content: logLine
        })
        logs = logs + logLine + '\n'
      }
    })
  })

  return {
    ipRequest,
    logs
  }
}
